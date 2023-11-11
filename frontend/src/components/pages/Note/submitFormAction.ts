'use server';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import { FormSubmitActionResponse } from "./FormSubmitActionResponse";
import { deleteNote } from "@/lib/deleteNote";

export async function submitFormAction(noteId: number): Promise<FormSubmitActionResponse> {
  try {
    await deleteNote(noteId); // Call backend and delete note
    revalidatePath('/'); // Revalidate home page to clear notes cache
    revalidatePath(`/edit/${noteId}`); // Revalidate also specific note edit page
  } catch (e: unknown) {
    console.error(e);
    return {state: 'error'};
  }

  // `redirect` statement cannot be inside try-catch block because of Next.js issue:
  // https://stackoverflow.com/questions/76191324/next-13-4-error-next-redirect-in-api-routes
  redirect('/'); // Navigate back to home page
  // that's it - nothing to return here, redirect will take user to another page, we don't have to do anything else here
}
