import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {DatabaseService} from './database.service';
import { Note, CreateNoteDTO, createNoteSchema, UpdateNoteDTO, updateNoteSchema } from './models/Note';
import { ZodValidationPipe } from './pipes/ZodValidationPipe';

@Resolver('Note')
export class GraphqlResolver {
  constructor(private readonly databaseService: DatabaseService) {}

  @Query('notes')
  public async notes(): Promise<Note[]> {
    return await this.databaseService.selectNotes();
  }

  @Query('note')
  public async note(@Args('id') id: number): Promise<Note> {
    return await this.databaseService.selectNoteById(id);
  }

  @Mutation('createNote')
  public async createNote(@Args('dto', new ZodValidationPipe(createNoteSchema)) dto: CreateNoteDTO): Promise<Note> {
    return await this.databaseService.insertNote(dto);
  }

  @Mutation('updateNote')
  public async updateNote(@Args('id') id: number, @Args('dto', new ZodValidationPipe(updateNoteSchema)) dto: UpdateNoteDTO): Promise<Note> {
    return await this.databaseService.updateNote(id, dto);
  }

  @Mutation('deleteNote')
  public async deleteNote(@Args('id') id : number): Promise<Note> {
    return await this.databaseService.deleteNote(id);
  }
}
