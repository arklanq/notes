import {Note, noteSchema} from '@/models/Note';
import {baseUrl} from './server';
import {NoteNotFoundException} from '../exceptions/NoteNotFoundException';
import {ResourceFetchException} from '../exceptions/ResourceFetchException';

/**
 * @throws {@link ResourceFetchException} on any unknown error
 * @throws {@link NoteNotFoundException} when note with specified noteId wasn't found
 */
export async function getNote(noteId: number): Promise<Note> {
  let response: Response;

  response = await fetch(new URL(`/notes/${noteId}`, baseUrl), {
    cache: 'no-store',
    method: 'GET',
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
