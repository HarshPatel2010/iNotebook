const express = require("express");
const router = express.Router();
const Note = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const { response } = require("express");

// Route 1: Get All the Notes using: GET "/api/notes/getuser".login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
// Route 2: add a new note using: POST "/api/notes/addnote".login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter the valid title").isLength({ min: 3 }),
    body("description", "enter valid description").isLength({ min: 2 }),
    body("tag", "enter valid description").isLength({ min: 1 })
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there iare errors,return request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3: add a new note using: put "/api/notes/update/:id".login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
  const {title,description,tag}=req.body;

  //create a newNote object
  const newNote = {};
  if(title){newNote.title= title};
  if(description){newNote.description= description};
  if(tag){newNote.tag= tag};

  //Find the note to be upadated and update it
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Note Found")};

  // let check,is he the user whos owns this note?
  if(note.user.toString() !== req.user.id){
    return response.status(401).send("Not allowed");
  }
  note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
  res.json({note});
})

// Route 4 : delete an existing Note using : DELETE  "/api/notes/deletenote/:id"
router.delete("/deletenote/:id",fetchuser,async (req,res)=>{
  const {title,description,tag}=req.body;

  //Find the note to be upadated and update it
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Note Found")};

  // let check,is he the user whos owns this note?
  if(note.user.toString() !== req.user.id){
    return response.status(401).send("Not allowed");
  }
  note = await Note.findByIdAndDelete(req.params.id);
  res.json({"Success":"Your Note has been successfully Deleted",note:note});
})

module.exports = router;
