const express = require("express");

const router = express.Router();

module.exports = (config) => {
    router.get("/", (req, res) => {
        var items = [];
        var total = 0;

        if(req.session.cartItems)
            req.session.cartItems.forEach(id => {
                config.data.computers.forEach(computer => {
                    if(id === computer.id) {
                        items.push(computer);
                        total += computer.price;
                    }
                });
            });

        res.render("cart", {computers: items, total: total});
    });

    router.post("/add", (req, res) => {
        if(!req.body.itemID)
            res.status(400).json({response: "no itemID sent"});
        if(!req.session.cartItems){
            var itemsInList = [];
            itemsInList.push(req.body.itemID);
            req.session.cartItems = itemsInList;
            res.json({size: req.session.cartItems.length});
        } else {
            req.session.cartItems.push(req.body.itemID);
            res.json({size: req.session.cartItems.length});
        }
    });

    router.get("/cart", (req,res) => {
        if(req.session.cartItems)
            res.json(req.session.cartItems);
        res.send("No items!");
    });
    return router;
}