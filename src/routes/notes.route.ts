import { Hono } from "hono";
import { createNotes, getNotesById, viewNotes } from "../controllers/notes.controller";

const notesRouter = new Hono()

notesRouter.post("", createNotes)
notesRouter.post("/:id/view", viewNotes)
notesRouter.get("/:id", getNotesById)


export default notesRouter