import {Controller, Get, Param, ParseIntPipe, NotFoundException, Post, Body, Delete, Put} from '@nestjs/common';
import {DatabaseService} from './database.service';
import {Note, CreateNoteDTO, createNoteSchema, updateNoteSchema, UpdateNoteDTO} from './models/Note';
import {ZodValidationPipe} from './pipes/ZodValidationPipe';
import {NoteNotFoundException} from './exceptions/NoteNotFoundException';

@Controller('/api/rest/notes')
export class RestController {
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
  public async createNote(@Body(new ZodValidationPipe(createNoteSchema)) dto: CreateNoteDTO): Promise<Note> {
    return await this.databaseService.insertNote(dto);
  }

  @Put(':id')
  public async updateNote(
    @Param('id', ParseIntPipe) noteId: number,
    @Body(new ZodValidationPipe(updateNoteSchema)) dto: UpdateNoteDTO
  ): Promise<Note> {
    return await this.databaseService.updateNote(noteId, dto);
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
