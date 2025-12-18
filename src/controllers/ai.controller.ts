import type { Context } from "hono";
import Note from "../models/notes.model";
import { summarizeWithAi } from "../lib/ai";

export const summarizeContent = async (c: Context) => {
    const {id} = c.req.param()

    try {
        const notes = await Note.findOne({
            noteId: id
        })

        if(!notes){
            return c.json({
                data: {
                    msg: "Couldn't find notes to summarize"
                }
            }, 400)
        }

        const summarizedText = await summarizeWithAi(notes.content)

        return c.json({
            data: {
                msg: "Summarized the content",
                summarizedText: summarizedText
            }
        }, 200)
    } catch (error) {
        c.json({
            data: {
                msg: "Internal server error"
            }
        }, 500)
    }
}