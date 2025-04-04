import express from "express";
import {
  addNotes,
  readNotes,
  updateNotes,
  deleteNotes,
  singleNote,
  pinnedNote,
  searchNote,
} from "../controller/notesController.js";
import addNoteMiddleware from "../middlewares/addNotesMiddleware.js";
import updateNotesMiddlewares from "../middlewares/updateNotesMiddleware.js";
const noteRoutes = express.Router();

noteRoutes.post("/add", addNoteMiddleware, addNotes); //adding the note route
noteRoutes.get("/read/:userID", readNotes); //fetching all notes routes
noteRoutes.put("/update", updateNotesMiddlewares, updateNotes); //updating the notes route
noteRoutes.delete("/delete/:notesID", deleteNotes); //deleting the notes route
noteRoutes.get("/singleNote/:notesID", singleNote); //fetching the single note
noteRoutes.put("/pinnedNote/:notesID", pinnedNote); //pin and unpin the note route
noteRoutes.get("/searchQuery/:userID", searchNote); //search the query route
export default noteRoutes;
