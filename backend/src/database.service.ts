import {Injectable} from '@nestjs/common';
import {Note, CreateNoteDTO, UpdateNoteDTO} from './models/Note';
import {NoteNotFoundException} from './exceptions/NoteNotFoundException';

@Injectable()
export class DatabaseService {
  private readonly kv: Map<number, Note> = new Map();
  private autoIncrement = 0;

  public async selectNotes(): Promise<Note[]> {
    return Array.from(this.kv.values());
  }

  // I am using 'async' here to simulate real DB call
  public async selectNoteById(noteId: number): Promise<Note | null> {
    return this.kv.get(noteId) || null;
  }

  // I am using 'async' here to simulate real DB call
  public async insertNote(noteDTO: CreateNoteDTO): Promise<Note> {
    const id: number = this.autoIncrement++;
    const now: Date = new Date();
    const note: Note = Object.assign(noteDTO, {
      id: id,
      createDate: now,
      lastUpdateDate: now
    });
    this.kv.set(id, note);
    return note;
  }

  // I am using 'async' here to simulate real DB call
  /**
   * @throws {@link NoteNotFoundException} if note with specified noteId was not found
   */
  public async updateNote(noteId: number, noteDTO: UpdateNoteDTO): Promise<Note> {
    const existingNote: Note | null = await this.selectNoteById(noteId);

    if (existingNote === null) throw new NoteNotFoundException(noteId);

    const updatedNote: Note = Object.assign(existingNote, noteDTO);

    this.kv.set(noteId, updatedNote);

    return updatedNote;
  }

  // I am using 'async' here to simulate real DB call
  public async deleteNote(noteId: number): Promise<Note> {
    const existingNote: Note | null = await this.selectNoteById(noteId);

    if (existingNote === null) throw new NoteNotFoundException(noteId);

    this.kv.delete(noteId);

    return existingNote;
  }
}
