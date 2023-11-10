import {Module} from '@nestjs/common';
import {NotesController} from './notes.controller';
import {DatabaseService} from './database.service';

@Module({
  imports: [],
  controllers: [NotesController],
  providers: [DatabaseService]
})
export class NotesModule {}
