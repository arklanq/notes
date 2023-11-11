'use server';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {Note} from '@/models/Note';
import {createNote} from '@/lib/createNote';
import {FormValues} from '../../organisms/CreateNoteForm/FormValues';
import { FormSubmitActionResponse } from "./FormSubmitActionResponse";

export async function submitFormAction(formValues: FormValues): Promise<FormSubmitActionResponse> {
  let createdNote: Note;

  try {
    createdNote = await createNote(formValues); // Call backend and create note
    revalidatePath('/'); // Revalidate home page to clear notes cache
  } catch (e: unknown) {
    console.error(e);
    return {state: 'error'};
  }

  // `redirect` statement cannot be inside try-catch block because of Next.js issue:
  // https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
  redirect(`/${createdNote.id}`); // Navigate to newly created note page
  // that's it - nothing to return here, redirect will take user to another page, we don't have to do anything else here
}
