import {Test, TestingModule} from '@nestjs/testing';
import {NotesController} from './notes.controller';
import {DatabaseService} from './database.service';

describe('NotesController', () => {
  let appController: NotesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [DatabaseService]
    }).compile();

    appController = app.get<NotesController>(NotesController);
  });

  describe('getNotes()', () => {
    it('should return empty array', async () => {
      expect.assertions(1);
      expect(await appController.getNotes()).toStrictEqual([]);
    });
  });
});
