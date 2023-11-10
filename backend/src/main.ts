import {NestFactory} from '@nestjs/core';
import {NotesModule} from './notes.module';
import {errorMap} from 'zod-validation-error';
import {z} from 'zod';
import {rateLimit} from "express-rate-limit";

// Before you start reviewing, please see
// https://www.youtube.com/watch?v=dQw4w9WgXcQ

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

async function bootstrap(): Promise<void> {
  // Provide custom message mapping for Zod issues
  z.setErrorMap(errorMap);

  const app = await NestFactory.create(NotesModule);

  app.enableCors({
    // Only for development
    origin: '*'
  });

  app.use(limiter);

  await app.listen(8000);
}

void bootstrap();
