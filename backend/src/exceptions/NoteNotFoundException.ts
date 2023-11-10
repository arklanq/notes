import { Exception } from "enhanced-exception";

export class NoteNotFoundException extends Exception {
  constructor(noteId: number) {
    super(`Note (ID:${noteId}) not found.`);
  }
}
