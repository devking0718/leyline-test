const db = require('../models');
const Database = db.TestDB;

module.exports = {
    async getResponse(req, res) {
        try {
            const response = await Database.findAll({
                limit: 1,
                order: [['updatedAt', 'DESC']]
            });

            res.status(200).json({ message: "", data: response });
        }
        catch (error) {
            res.status(500).json({ error: 'Error', 'Server Error:': error });
        }
    },

    async agreeRequest(req, res) {
        try {
            const { id, responseAmount, status } = req.body;

            const request = await Database.findByPk(id);

            const updatedStatus = await request.update({ status: status, responseAmount: responseAmount })
            console.log("updatedStatus", updatedStatus)
            res.status(200).json({ message: "Request agreed" });
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error', 'Server Error:': error });
        }
    },

    async disputeRequest(req, res) {
        try {
            const { id, requestAmount, status } = req.body;
            const request = await Database.findByPk(id);

            const updatedStatus = await request.update({ status: status, responseAmount: requestAmount })
            console.log("updatedStatus", updatedStatus)
            res.status(200).json({ message: "Your request has been sent successfully." });
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error', 'Server Error:': error });
        }
    }
}