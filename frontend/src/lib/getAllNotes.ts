import { Note, noteSchema } from "@/models/Note";
import { baseUrl } from "./server";
import { z } from "zod";
import { ResourceFetchException } from "../exceptions/ResourceFetchException";

/**
 * @throws {@link ResourceFetchException} on any unknown error
 */
export async function getAllNotes(): Promise<Note[]> {
  const response: Response = await fetch(
    new URL('/notes', baseUrl),
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
  );

  if (!response.ok) throw new ResourceFetchException(response);

  const data: unknown = await response.json();
  const validationSchema: z.ZodType<Note[]> = z.array(noteSchema);
  return validationSchema.parse(data);
}
