import {z} from 'zod';

export interface Note {
  id: number;
  title: string;
  content: string;
  createDate: Date;
  lastUpdateDate: Date;
}

export type CreateNoteDTO = Omit<Note, 'id' | 'createDate' | 'lastUpdateDate'>;

export const createNoteSchema = z
  .object({
    title: z.string().min(1).max(255), // Optimal length for SQL "VARCHAR" column
    content: z.string().min(1).max(65535) // Optimal length for SQL "TEXT" column
  })
  .required();

export type UpdateNoteDTO = CreateNoteDTO;
