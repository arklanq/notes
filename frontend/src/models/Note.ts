import {z, ZodType} from 'zod';

export interface Note {
  id: number;
  title: string;
  content: string;
  createDate: Date;
  lastUpdateDate: Date;
}

export const noteSchema: ZodType<Note> = z
  .object({
    id: z.number().nonnegative().int(),
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(65535),
    createDate: z.coerce.date(),
    lastUpdateDate: z.coerce.date()
  })
  .required();

export type CreateNoteDTO = Omit<Note, 'id' | 'createDate' | 'lastUpdateDate'>;

export const createNoteSchema = z
  .object({
    title: z.string().min(1).max(255), // Optimal length for SQL "VARCHAR" column
    content: z.string().min(1).max(65535) // Optimal length for SQL "TEXT" column
  })
  .required();

export type UpdateNoteDTO = CreateNoteDTO;
