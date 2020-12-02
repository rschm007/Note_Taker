// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const noteData = require("../db/db");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET
  // ---------------------------------------------------------------------------

    // read api/notes and return data as JSON
  app.get("/api/notes", function(req, res) {
    res.json(noteData);
  });

  // API POST
    // ---------------------------------------------------------------------------

    // receive a new note, save on request body, 
    // add to db.json, and return new note to client
  app.post("/api/notes", function(req, res) {
      noteData.push(req.body);
      res.json(noteData);
    });

  // API DELETE
    // ---------------------------------------------------------------------------
    // receive a query param containing id of a note to delete
    // read all notes from db.json and remove the relevant note w/ appropriate ID
    // rewrite notes to db.json files
    app.delete("/api/notes", function(req, res) {
        noteData.
        res.json(noteData);
    });
};