import type { Context } from "hono";
import { nanoid } from "nanoid";
import Note from "../models/notes.model";
import bcrypt from "bcryptjs";
import { getExpiryInDays } from "../lib/utils";

export const createNotes = async (c: Context) => {
  try {
    const { content, password, expiryInDays } = await c.req.json();

    if (!content || !password) {
      return c.json(
        {
          data: {
            msg: "Content and password are required",
          },
        },
        400
      );
    }

    const nonWhitespaceContentLength = content.replace(/\s/g, "").length;

    if (nonWhitespaceContentLength > 500) {
      return c.json(
        {
          data: {
            msg: "Note must be under 500 characters",
          },
        },
        400
      );
    }

    const noteId = nanoid(6);
    const hashedPassword = await bcrypt.hash(password, 10);
    const expiresAt = expiryInDays ? getExpiryInDays(expiryInDays) : null;

    const notes = await Note.create({
      noteId: noteId,
      content: content,
      password: hashedPassword,
      expiresAt: expiresAt,
    });

    return c.json({
      data: {
        msg: "Notes created",
        noteId: notes.noteId,
      },
    });
  } catch (error) {
    console.log(error);
    return c.json(
      {
        data: {
          msg: "Internal server error",
        },
      },
      500
    );
  }
};

export const viewNotes = async (c: Context) => {
  const { id } = c.req.param();
  const { password } = await c.req.json();

  try {
    const existingNotes = await Note.findOne({
      noteId: id,
    });

    if (!existingNotes) {
      return c.json(
        {
          data: {
            msg: "Notes doesn't exist",
          },
        },
        400
      );
    }

    if (existingNotes.expiresAt && new Date() > existingNotes.expiresAt) {
      return c.json(
        {
          data: {
            msg: "Notes already expired",
          },
        },
        400
      );
    }

    if (!password) {
      return c.json(
        {
          data: {
            msg: "Please enter password",
          },
        },
        400
      );
    }

    const decryptedPassword = await bcrypt.compare(
      password,
      existingNotes.password
    );

    if (decryptedPassword === false) {
      return c.json(
        {
          data: {
            msg: "Incorrect password",
          },
        },
        400
      );
    }

    const content = existingNotes.content;

    return c.json(
      {
        data: {
          msg: "You can view content",
          content: content,
        },
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        data: {
          msg: "Internal server error",
        },
      },
      500
    );
  }
};

export const getNotesById = async (c: Context) => {
  const { id } = c.req.param();

  try {
    const notes = await Note.findOne({
      noteId: id,
    });

    if (!notes) {
      return c.json(
        {
          data: {
            msg: "No notes found with this id",
          },
        },
        400
      );
    }

    return c.json(
      {
        data: {
          msg: "Notes found",
          noteId: notes.noteId,
          createdAt: notes.createdAt,
          expiresIn: notes.expiresAt,
        },
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        data: {
          msg: "Internal server error",
        },
      },
      500
    );
  }
};
