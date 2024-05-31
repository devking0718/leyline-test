module.exports = app => {
    const controller = require("../controllers/index.controller");
    var router = require("express").Router();

    router.get("/getResponse", controller.getResponse);
    router.post("/agreeRequest", controller.agreeRequest);
    router.post("/disputeRequest", controller.disputeRequest);

    app.use('/api', router);
}