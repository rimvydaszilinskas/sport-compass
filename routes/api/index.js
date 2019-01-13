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

    router.post("/add", (req, res) => {
        var body = req.body;

        if(!body.manufacturer || !body.model || !body.processor || !body.graphics || !body.screensize || !body.memory || !body.price){
            res.status(400).json({
                response: "Bad request"
            });
        } else {
            fs.readFile("../../data/dummy.json", (err, data) => {
                // console.log(data)
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