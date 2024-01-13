import {CreateNoteDTO, Note, noteSchema} from '@/models/Note';
import {baseUrl} from './server';
import {ResourceFetchException} from '../exceptions/ResourceFetchException';

/**
 * @throws {@link ResourceFetchException} on any unknown error
 */
export async function createNote(dto: CreateNoteDTO): Promise<Note> {
  const response: Response = await fetch(new URL('/api/rest/notes', baseUrl), {
    cache: 'no-store',
    method: 'POST',
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
