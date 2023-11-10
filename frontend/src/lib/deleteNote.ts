import { Note, noteSchema } from "@/models/Note";
import { baseUrl } from "./server";
import { ResourceFetchException } from "../exceptions/ResourceFetchException";
import { NoteNotFoundException } from "../exceptions/NoteNotFoundException";

/**
 * @throws {@link ResourceFetchException} on any unknown error
 * @throws {@link NoteNotFoundException} when note with specified noteId wasn't found
 */
export async function deleteNote(noteId: number): Promise<Note> {
  const response: Response = await fetch(new URL(`/notes/${noteId}`, baseUrl), {
    cache: 'no-store',
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 404) throw new NoteNotFoundException(noteId);
    else throw new ResourceFetchException(response);
  }

  const data: unknown = await response.json();
  return noteSchema.parse(data);
}
