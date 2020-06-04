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
        body: req.body.body,
    }
    newNote.id = uuid.v4("aa","3bbcee75-cecc-5b56-8031-b6641c1ed1f1"); //We need to actually make this something random instead. Maybe even just a weak random number or whatever.
    //Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    
    //parse the current db.json into an array of objects
    let fileContent = JSON.parse(fs.readFileSync("./db/db.json"));
    //push the newNote into the end
    fileContent.push(newNote);
    //overwrite the db.json with the new array
    
    //For some reason this will NOT take the double dots, single dot only for writing.
    // fs.writeFile("./db/db.json", function(err) {
    //     if (err) throw err;
    //     console.log("Wow! It's Appended!");
    //   });
  });

  app.delete("/api/notes/:id", function(req, res){
    //Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    console.log("delete -- " + req.body);
  })
}