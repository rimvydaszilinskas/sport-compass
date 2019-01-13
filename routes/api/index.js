const express = require("express");
const fs = require("fs");

const router = express.Router();

module.exports = (config) => {
    router.get("/", (req, res) => {
        res.json(config.data.computers);
    });

    router.post("/", (req, res) => {
        res.json(config.data.computers);
    });

    router.post("/get", (req, res) => {
        if(!req.body.itemID)
            return res.status(400).json({response: "No itemID supplied"});
        var id = req.body.itemID;

        var element = config.data.computers.find(elem => {
            return elem.id == id;
        });

        if(element)
            return res.status(200).json(element);
        res.status(404).json({response: "Item not found"});
    });

    router.post("/filter", (req, res) => {
        var data = config.data.computers;
        var responseData = [];
        var started = false;
        var filters = req.body;

        // Return all the elements if no filters have been applied
        if(Object.keys(filters).length === 0){
            return res.status(200).json(data);
        }

        // Filter down depending on processor
        if(filters.processor){
            started = true;
            data.forEach(elem => {
                if(elem.processor == filters.processor)
                    responseData.push(elem);
            });
        }

        if(filters.screenSize){
            if(!started){
                responseData = data;
                started = true;
            }
            var holder = [];
            responseData.forEach(elem => {
                if(elem.screensize == filters.screenSize)
                    holder.push(elem);
            });
            responseData = holder;
        }

        if(filters.price){
            if(!started){
                responseData = data;
                started = true;
            }
            var holder = [];
            responseData.forEach(elem => {
                if(elem.price >= filters.price - 5000 && elem.price <= filters.price)
                    holder.push(elem);
            });
            responseData = holder;
        }
        res.status(200).json(responseData);
    });

    router.post("/add", (req, res) => {
        var body = req.body;

        if(!body.manufacturer || !body.model || !body.processor || !body.graphics || !body.screensize || !body.storage || !body.price){
            res.status(400).json({
                response: "Bad request"
            });
        } else {
            fs.readFile("../../data/dummy.json", (err, data) => {
                var json = JSON.parse(data);
                json.push(body);
                fs.writeFile("../../data/dummy.json", JSON.stringify(json));
            });
            res.status(200).json({
                response: "OK"
            });
        }
    });
    return router;
};