import { Hono } from "hono";
import notesRouter from "./notes.route";

const rootRouter = new Hono()

rootRouter.route("/notes", notesRouter)

export default rootRouter