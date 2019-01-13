const express = require("express");
const apiRoutes = require("./api");
const cartRoutes = require("./cart");

const router = express.Router();

module.exports = (config) => {
    router.get("/", (req, res) => {
        console.log(req.sessionID)
        if(req.session.cartItems)
            var arr = req.session.cartItems;
        else 
            var arr = [];
        res.render("index", {computers : config.data.computers, items: arr});
    });

    router.post("/checkout", (req, res) => {
        req.session.destroy();
        res.status(200).json({response: "Session ended"});
    });

    router.use("/api", apiRoutes(config));
    router.use("/cart", cartRoutes(config));

    return router;
};