const express = require("express");

const router = express.Router();

module.exports = (config) => {
    router.get("/", (req, res) => {
        var items = [];
        var total = 0;
        var itemCount = req.session.cartItems ? req.session.cartItems : 0;

        if(req.session.cartItems){
            req.session.cartItems.forEach(id => {
                config.data.computers.forEach(computer => {
                    if(id == computer.id) {
                        items.push(computer);
                        total += computer.price;
                    }
                });
            });
        }
        res.render("cart", {items: items, total: total, itemCount: itemCount});
    });

    router.post("/add", (req, res) => {
        if(!req.body.itemID)
            return res.status(400).json({response: "no itemID sent"});
        if(!req.session.cartItems){
            var itemsInList = [];
            itemsInList.push(req.body.itemID);
            req.session.cartItems = itemsInList;
            res.status(200).json({size: req.session.cartItems.length});
        } else {
            req.session.cartItems.push(req.body.itemID);
            res.status(200).json({size: req.session.cartItems.length});
        }
    });

    router.post("/remove", (req, res) => {
        if(!req.body.itemID)
            return res.status(400).json({response: "no itemID"});
        if(req.session.cartItems.indexOf(req.body.itemID) === -1)
            return res.status(400).json({response: "bad request"});
        if(req.session.cartItems.splice(req.session.cartItems.indexOf(req.body.itemID), 1) !== null){
            var total = 0;
            if(req.session.cartItems){
                req.session.cartItems.forEach(id => {
                    config.data.computers.forEach(computer => {
                        if(id == computer.id) {
                            total += computer.price;
                        }
                    });
                });
            }
            return res.status(200).json({response: "OK", count: req.session.cartItems.length, total: total});
        }
        res.status(500).json({response: "Internal server error"});
    });

    router.get("/get", (req, res) => {
        items = [];

        if(req.session.cartItems){
            req.session.cartItems.forEach(id => {
                config.data.computers.forEach(computer => {
                    if(id === computer.id) {
                        items.push(computer);
                    }
                });
            });
        }

        res.status(200).json(items);
    });

    //return json items in the cart
    router.get("/cart", (req,res) => {
        var items = [];
        if(req.session.cartItems){
            if(req.session.cartItems){
                req.session.cartItems.forEach(id => {
                    config.data.computers.forEach(computer => {
                        if(id == computer.id) {
                            items.push(computer);
                        }
                    });
                });
            }
            return res.json({computers: items});
        }
        res.status(200).json({message: "No items found!"});
    });

    return router;
}