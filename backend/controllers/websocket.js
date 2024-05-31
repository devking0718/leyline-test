const db = require('../models');
const Database = db.TestDB;

module.exports = io => {
   io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('message', async (message) => {
         console.log("-0-0-0-:", message)
         await sendRequest(io, message);
      });

      socket.on('disconnect', () => {
         console.log('Client disconnected');
      });
   });
}

const sendRequest = async (io, req) => {
   try {
      const request = JSON.parse(req);
      const newRequest = {
         requestAmount: request.requestAmount,
         responseAmount: "0",
         status: request.status
      };

      console.log("newRequest", newRequest)

      await Database.create(newRequest);

      io.emit("message", JSON.stringify({ message: 'Your request has been sent successfully.', success: true, type: "request" }))
   }
   catch (error) {
      // res.status(500).json({ error: 'Error', 'Server Error:': error });
      io.emit("message", JSON.stringify({ message: 'Your request has been sent field.', success: false }))
   }
}
