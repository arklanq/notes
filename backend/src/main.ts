import {NestFactory} from '@nestjs/core';
import {NotesModule} from './notes.module';
import {errorMap} from 'zod-validation-error';
import {z} from 'zod';

async function bootstrap(): Promise<void> {
  // Provide custom message mapping for Zod issues
  z.setErrorMap(errorMap);

  const app = await NestFactory.create(NotesModule);
  await app.listen(8000);
}

void bootstrap();
