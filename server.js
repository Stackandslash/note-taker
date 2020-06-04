var express = require("express"); //This is a dependency

var app = express(); //This is express. It's different.


var PORT = 8080;

// We need both of these to parse data properly.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//This is where we put all our get, post, and delete routing.
require("./routes/apiroutes")(app);
//This is where we put our HTML routing. Don't recall why these are supposed to be separate. Should ask.
require("./routes/htmlroutes")(app);

//This is our listener. It listens. It also tells us it's listening, and on what port.
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});