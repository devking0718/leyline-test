const db = require('../models');
const Database = db.Sattlement;

module.exports =  {
    async sendRequest (req, res, io) {
        try {
            const {requestAmount, status} = req.body;
    
            const newRequest = {
                requestAmount: requestAmount,
                status: status
            }    
            await Database.create(newRequest);  

            res.status(200).json({ message: "Your request has been sent successfully." });   
            io.emit("message", JSON.stringify({ message: 'Your request has been sent successfully.', success: true, type: "request" }))
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error', 'Server Error:': error });
            io.emit("message", JSON.stringify({ message: 'Your request has been sent field.', success: false }))
        }
    },

    async getResponse(req, res) {
        try {
            const response = await Database.findAll({
                limit: 1,
                order: [['id', 'DESC']]
            });

            res.status(200).json({ message: "", data: response });
        }
        catch (error) {
            res.status(500).json({ error: 'Error', 'Server Error:': error });
        }
    },

    async agreeRequest(req, res) {
        try {
            const { id, status } = req.body;

            const request = await Database.findByPk(id);

            await request.update({ status: status })
            res.status(200).json({ message: "Request agreed" });
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error', 'Server Error:': error });
        }
    },

    async disputeRequest(req, res) {
        try {
            const { id, status } = req.body;
            const request = await Database.findByPk(id);

            await request.update({ status: status })
            res.status(200).json({ message: "Your request has been sent successfully." });
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error', 'Server Error:': error });
        }
    }
}