import {Test, TestingModule} from '@nestjs/testing';
import {RestController} from './rest.controller';
import {DatabaseService} from './database.service';

describe('RestController', () => {
  let appController: RestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RestController],
      providers: [DatabaseService]
    }).compile();

    appController = app.get<RestController>(RestController);
  });

  describe('getNotes()', () => {
    it('should return empty array', async () => {
      expect.assertions(1);
      expect(await appController.getNotes()).toStrictEqual([]);
    });
  });
});

