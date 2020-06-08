//This file holds all the get/post stuff for our API info.

//This requires the file to exist (possibly), then assigns the appropriate file to the variable, so we don't need to write this out again in the body.
var notesData = require("../db/db");
var uuid = require("uuid");
var fs = require("fs");

module.exports = function(app) {
  //Here are our routing functions for calls.

  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });

  app.post("/api/notes", function(req, res) {
    let newNote = {
        title: req.body.title,
        text: req.body.text,
    }
    newNote.id = uuid.v4(); //We need to actually make this something random instead. Maybe even just a weak random number or whatever.
    //Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    console.log(newNote);
    //parse the current db.json into an array of objects
    let fileContent = JSON.parse(fs.readFileSync("./db/db.json"));
    //push the newNote into the end
    fileContent.push(newNote);
    //overwrite the db.json with the new array
    
    //For some reason this will NOT take the double dots, single dot only for writing.
    fs.writeFileSync("./db/db.json", JSON.stringify(fileContent));

  });

  app.delete("/api/notes/:id", function(req, res){
    //Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    
    //parse the current db.json into an array of objects
    let fileContent = JSON.parse(fs.readFileSync("./db/db.json"));
    let deleteId = req.params.id;
    console.log(fileContent.length);
    //iterate over each one with a FOR loop to find the index of the one with the id passed.
    for (let i = 0; i < fileContent.length; i++) {
      if (fileContent[i].id === deleteId){
        //use splice to remove that from the array
        fileContent.splice(i, 1);
        //write fileContent to the json file.
        fs.writeFileSync("./db/db.json", JSON.stringify(fileContent));
      }
    }
  })
}