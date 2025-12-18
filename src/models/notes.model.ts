import { model, Schema } from "mongoose";

const notesSchema = new Schema(
  {
    noteId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

notesSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Note = model("Note", notesSchema);

export default Note;
