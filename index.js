const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const uuid = require("uuid/v4");
const data = require("./data/dummy.json");

const routes = require("./routes");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    genid: (req) => {
        return uuid();
    },
    secret: "cats are cool",
    resave: false,
    saveUninitialized: true
}));

app.use("/", routes({data: data}));

app.listen(3000, (err) => {
    if(err)
        throw err;
    console.log("Listening on port 3000");
})