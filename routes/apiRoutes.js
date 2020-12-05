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
};
