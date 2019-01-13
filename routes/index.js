const express = require("express");
const apiRoutes = require("./api");
const cartRoutes = require("./cart");

const router = express.Router();

module.exports = (config) => {
    router.get("/", (req, res) => {
        console.log(req.session.randomText);
        console.log(req.sessionID)
        req.session.randomText = "Bla";
        console.log(config.data.computers)
        res.render("index", {computers : config.data.computers});
    });

    router.use("/api", apiRoutes(config));
    router.use("/cart", cartRoutes(config));

    return router;
};