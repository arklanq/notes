'use server';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {Note} from '@/models/Note';
import {FormValues} from '../../organisms/EditNoteForm/FormValues';
import { FormSubmitActionResponse } from "./FormSubmitActionResponse";
import { editNote } from "@/lib/editNote";

export async function submitFormAction(noteId: number, formValues: FormValues): Promise<FormSubmitActionResponse> {
  let editedNote: Note;

  try {
    editedNote = await editNote(noteId, formValues); // Call backend and update note
    revalidatePath('/'); // Revalidate home page to clear notes cache
    revalidatePath(`/edit/${noteId}`); // Revalidate also specific note edit page
  } catch (e: unknown) {
    console.error(e);
    return {state: 'error'};
  }

  // `redirect` statement cannot be inside try-catch block because of Next.js issue:
  // https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
  redirect(`/${editedNote.id}`); // Navigate to freshly edited note page
  // that's it - nothing to return here, redirect will take user to another page, we don't have to do anything else here
}
