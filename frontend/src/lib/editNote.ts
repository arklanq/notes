import {UpdateNoteDTO, Note, noteSchema} from '@/models/Note';
import {baseUrl} from './server';
import {ResourceFetchException} from '../exceptions/ResourceFetchException';

/**
 * @throws {@link ResourceFetchException} on any unknown error
 * @throws {@link NoteNotFoundException} when note with specified noteId wasn't found
 */
export async function editNote(noteId: number, dto: UpdateNoteDTO): Promise<Note> {
  const response: Response = await fetch(new URL(`/notes/${noteId}`, baseUrl), {
    cache: 'no-store',
    method: 'PUT',
    body: JSON.stringify(dto),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new ResourceFetchException(response);

  const data: unknown = await response.json();
  return noteSchema.parse(data);
}
