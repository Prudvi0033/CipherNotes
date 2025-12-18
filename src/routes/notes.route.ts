import { Hono } from "hono";
import { createNotes, getNotesById, viewNotes } from "../controllers/notes.controller";
import { summarizeContent } from "../controllers/ai.controller";

const notesRouter = new Hono()

notesRouter.post("", createNotes)
notesRouter.post("/:id/view", viewNotes)
notesRouter.get("/:id", getNotesById)

notesRouter.post("/:id/summarize", summarizeContent)


export default notesRouter