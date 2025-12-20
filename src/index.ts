import { Hono, type Context } from "hono";
import { ConnectDB } from "./lib/db";
import rootRouter from "./routes";
import { cors } from "hono/cors";

const app = new Hono()

app.use("/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))

app.get("/", (c: Context) => {
    return c.text("Hello")
})

app.route("/api", rootRouter)

ConnectDB()

export default {
    port: process.env.PORT,
    fetch: app.fetch
}