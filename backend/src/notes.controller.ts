import {Controller, Get, Param, ParseIntPipe, NotFoundException, Post, Body, UsePipes, Delete} from '@nestjs/common';
import {DatabaseService} from './database.service';
import {Note, CreateNoteDTO, createNoteSchema} from './models/Note';
import {ZodValidationPipe} from './pipes/ZodValidationPipe';
import {NoteNotFoundException} from './exceptions/NoteNotFoundException';

@Controller('/notes')
export class NotesController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  public async getNotes(): Promise<Note[]> {
    return await this.databaseService.selectNotes();
  }

  @Get(':id')
  public async getNoteById(@Param('id', ParseIntPipe) noteId: number): Promise<Note> {
    const note: Note | null = await this.databaseService.selectNoteById(noteId);

    if (note === null) {
      throw new NotFoundException();
    }

    return note;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createNoteSchema))
  public async createNote(@Body() dto: CreateNoteDTO): Promise<Note> {
    return await this.databaseService.insertNote(dto);
  }

  @Delete(':id')
  public async deleteNote(@Param('id', ParseIntPipe) noteId: number): Promise<Note> {
    try {
      return await this.databaseService.deleteNote(noteId);
    } catch (e: unknown) {
      if (e instanceof NoteNotFoundException) throw new NotFoundException();

      // forward the error to the global error handler
      throw e;
    }
  }
}
