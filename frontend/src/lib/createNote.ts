import { CreateNoteDTO, Note, noteSchema } from "@/models/Note";
import {baseUrl} from './server';

export async function createNote(dto: CreateNoteDTO): Promise<Note> {
  const response: Response = await fetch(
    new URL('/notes', baseUrl),
    {
      cache: 'no-store',
      method: 'POST',
      body: JSON.stringify(dto),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
  );
  const data: unknown = await response.json();
  return noteSchema.parse(data);
}
