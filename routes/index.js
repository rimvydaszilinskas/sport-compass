const express = require("express");

const router = express.Router();

module.exports = (config) => {
    router.get("/", (req, res) => {
        console.log(config.data)
        console.log(req.session.randomText);
        console.log(req.sessionID)
        req.session.randomText = "Bla";
        res.render("index");
    });

    return router;
};