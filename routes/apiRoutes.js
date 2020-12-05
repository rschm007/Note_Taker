// ===============================================================================
// DEPENDENCIES
// ===============================================================================
const fs = require("fs");
const path = require("path");

// ===============================================================================
// API ROUTES
// ===============================================================================

module.exports = function (app) {
  // GET notes
  app.get("/api/notes",  (err, res) => {
    try {
      // read notes from JSON
      noteData = fs.readFileSync("./db/db.json", "utf8");
      // parse JSON object into an array of objects
      noteData = JSON.parse(noteData);
    }
    // catch err
    catch (err) {
      console.log(err);
    }
    // send array of objects to client
    res.json(noteData);
  });

  // POST notes
  app.post("/api/notes",  (req, res) => {
    try {
      // read notes from JSON
      noteData = fs.readFileSync("./db/db.json", "utf8");
      
      // parse JSON object into an array of objects
      noteData = JSON.parse(noteData);
      // assign a new unique id
      req.body.id = noteData.length;
      // push new noteData to the object array (req.body is the user input)
      noteData.push(req.body);
      // stringify it via JSON so it can be written to file
      noteData = JSON.stringify(noteData);
      // write new note to the file
      fs.writeFile("./db/db.json", noteData, "utf8", (err) => {
        // err handling
        if (err) throw err;
      });
      // convert back to an array of objects and send to client
      res.json(JSON.parse(noteData));
    }
    // catch err
    catch (err) {
      console.log(err);
    }
  });

  // RETRIEVE notes by calling specific ID
  app.get("/api/notes/:id", function (req, res) {
    // display JSON object of speficic note array
    // we find the specific note with req.params.id, which returns the ID parameter.
    noteData.json(noteData[req.param.id]);
  });

  // DELETE notes
  // use a specific id to identify the note we want to delete
  app.delete("/api/notes/:id", (req, res) => {
    try {
      // read notes from JSON
      noteData = fs.readFileSync("./db/db.json", "utf8");
      // parse JSON object into an array of objects
      noteData = JSON.parse(noteData);
      // delete the old note using filter method
      noteData = noteData.filter((note) => {
        // return if the note id is not the same as requested id
        return note.id != req.params.id;
      });
      // stringify it via JSON so it can be written to file
      noteData = JSON.stringify(noteData);
      // write new note to the file
      fs.writeFile("./db/db.json", noteData, "utf8", (err) => {
        // err handling
        if (err) throw err;
      });
      // convert back to an array of objects and send to client
      res.json(JSON.parse(noteData));
      }
      // catch err
      catch (err) {
      console.log(err);
      }
  });

  // DEFINE updateDB function
  function updateDB() {
    fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
      if (err) throw err;
      return true
    })
  }

};
