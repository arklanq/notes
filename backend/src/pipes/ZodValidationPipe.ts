import {PipeTransform, BadRequestException, HttpStatus} from '@nestjs/common';
import {ZodObject, ZodError, ZodIssue} from 'zod';

export class ZodValidationPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private schema: ZodObject<any>) {}

  public transform(value: unknown) {
    try {
      this.schema.parse(value);
    } catch (e: unknown) {
      const errorCondition = {
        error: 'Bad Request',
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Validation failed',
        issues:
          e instanceof ZodError
            ? e.issues.map((issue: ZodIssue): string => issue.message)
            : ['Unknown validation issue.']
      };

      throw new BadRequestException(errorCondition);
    }
    return value;
  }
}
