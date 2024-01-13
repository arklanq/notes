import request from 'supertest';
import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import {NotesModule} from '@/notes.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [NotesModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('/notes (GET)', () => {
    return request(app.getHttpServer()).get('/notes').expect(200).expect([]);
  });
});
