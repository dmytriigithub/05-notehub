import axios from "axios";
import type { Note } from "../types/note";

interface NotesHTTPResponse {
  notes: Note[];
  totalPages: number;
}

interface NoteHTTPRequest {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(
  search: string,
  page: number
): Promise<NotesHTTPResponse> {
  const response = await axios.get<NotesHTTPResponse>(
    `https://notehub-public.goit.study/api/notes/`,
    {
      params: {
        search,
        page,
        perPage: 12,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function createNote(newNote: NoteHTTPRequest) {
  const response = await axios.post(
    `https://notehub-public.goit.study/api/notes/`,
    newNote,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}

export async function deleteNote(noteId: string) {
  const response = await axios.delete(
    `https://notehub-public.goit.study/api/notes/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );
  return response.data;
}
