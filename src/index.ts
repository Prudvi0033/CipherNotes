import { Hono, type Context } from "hono";
import { ConnectDB } from "./lib/db";
import rootRouter from "./routes";

const app = new Hono()

app.get("/", (c: Context) => {
    return c.text("Hello")
})

app.route("/api", rootRouter)

ConnectDB()

export default {
    port: process.env.PORT,
    fetch: app.fetch
}