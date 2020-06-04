//Gotta load the path package to make this work properly.
var path = require("path");

//Make sure our externals can access this.
module.exports = function(app) {
    //This sends us to the notes page. It uses the __dirname magic and then sticks it to the main directory of the app/site/thingy, and tells it where to go from there. This is rather nice because I can't just concatenate stuff to the __dirname, since this is a level below where it needs to be.
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // This sends every other request to the home page.
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
