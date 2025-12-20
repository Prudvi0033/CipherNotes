# CipherNotes Backend

<img width="1255" height="508" alt="image" src="https://github.com/user-attachments/assets/00d7e7fc-7181-405c-ac60-42b7668e1bb3" />


## Overview

CipherNotes is a secure, minimal backend for creating, storing, viewing, and summarizing notes. Each note is protected with a password and can optionally expire after a defined period. The backend exposes a small set of REST APIs designed to keep the data model simple while enabling features like anonymous note sharing and AI-powered summarization.

The system is built around a single `Notes` collection and a clear API flow that prioritizes security and clarity.

---

## Data Model

### Notes

Each note stored in the database follows this structure:

```
Notes {
  id
  noteId
  content
  password
  expiresIn
  createdAt
}
```

### Field Description

* **id**: Internal database identifier
* **noteId**: Public identifier used in URLs
* **content**: Encrypted or plain note content
* **password**: Password required to view the note
* **expiresIn**: Expiration time or date for the note
* **createdAt**: Timestamp when the note was created

---

## API Routes

Base path:

```
/api/notes
```

### 1. Create Note

**POST** `/api/notes`

Creates a new note and returns a unique `noteId`.

**Response**

```
{
  noteId: string
}
```

---

### 2. Verify Note and View Content

**POST** `/api/notes/:id/view`

Verifies the provided password and returns the note content if valid.

**Request Body**

```
{
  password: string
}
```

**Response**

```
{
  content: string
}
```

---

### 3. Get Note Info

**GET** `/api/notes/:id`

Fetches basic information about a note using its `noteId`. This endpoint is used to display a list of user-created notes.

The frontend stores created `noteId`s in local storage and uses this endpoint to retrieve metadata for those notes.

**Response**

```
{
  noteId: string
  expiresIn: string
  createdAt: string
}
```

---

### 4. Summarize Note Content

**POST** `/api/notes/:id/summarize`

Generates a summarized version of the note content using an AI model.

**Response**

```
{
  summary: string
}
```

---

## Notes Flow Summary

1. User creates a note → backend returns `noteId`
2. Frontend stores `noteId` locally
3. User can fetch note info using `GET /:id`
4. To view content, user must verify with password
5. Optional AI summarization can be triggered per note
