const html = require('express').Router();
const path = require("path");

module.exports =  (html) => {
html.get("/", (req, res) =>
res.sendFile(path.join(__dirname, "/../public/index.html"))
);

html.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "/../public/notes.html"))
);

}