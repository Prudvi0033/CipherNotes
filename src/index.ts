import { Hono, type Context } from "hono";
import { ConnectDB } from "./lib/db";

const app = new Hono()

app.get("/", (c: Context) => {
    return c.text("Hello")
})

ConnectDB()

export default {
    port: process.env.PORT,
    fetch: app.fetch
}