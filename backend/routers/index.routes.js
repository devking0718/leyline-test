module.exports = (app, io) => {
    const controller = require("../controllers/index.controller");
    var router = require("express").Router();

    router.post("/sendRequest", (req, res) => controller.sendRequest(req, res, io));
    router.get("/getResponse", controller.getResponse);
    router.post("/agreeRequest", controller.agreeRequest);
    router.post("/disputeRequest", controller.disputeRequest);

    app.use('/api', router);
}