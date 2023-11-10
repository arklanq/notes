import {NestFactory} from '@nestjs/core';
import {NotesModule} from './notes.module';
import {errorMap} from 'zod-validation-error';
import {z} from 'zod';

// Before you start reviewing, please see
// https://www.youtube.com/watch?v=dQw4w9WgXcQ

async function bootstrap(): Promise<void> {
  // Provide custom message mapping for Zod issues
  z.setErrorMap(errorMap);

  const app = await NestFactory.create(NotesModule);
  app.enableCors({
    // Only for development
    origin: '*'
  });
  await app.listen(8000);
}

void bootstrap();
