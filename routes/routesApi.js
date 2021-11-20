const api = require('express').Router();
const fspromises = require("fs/promises");
const fs = require("fs")

const {v4:uuidv4} = require('uuid'); 

module.exports = api => {
api.get("/api/notes", (req, res) => {
    var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(data);

});

api.get("/api/notes/:id", (req, res) => {
    var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(data[Number(req.params.id)]);

});

api.post("/api/notes", (req, res) => {
    var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;
    let uniqueId = uuidv4();
    newNote.id = uniqueId;
    data.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(data))
    res.json(data);    
});
   
api.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;
    console.log(`Deleting note with id ${noteId}`)
    fspromises.readFile('./db/db.json', 'utf8')
    
    .then((data) => JSON.parse(data))
    .then((data) =>{
        const result = data.filter((noteDeleted) => noteDeleted.id !== noteId)
        console.log(result)
        fs.writeFileSync('./db/db.json', JSON.stringify(result, null, 4))
        res.status(200).json(result)    
    })
    .catch((error) => {
        console.log(error);
    })
}); 
}
