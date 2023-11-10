import {FormikValues, FormikErrors} from 'formik';
import {ZodError, ZodIssue, z} from 'zod';

export function validateFormWithZod(validationSchema: z.Schema) {
  return (values: FormikValues) => {
    try {
      validationSchema.parse(values);
    } catch (e: unknown) {
      return (e as ZodError).issues.reduce(
        (errors: FormikErrors<FormikValues>, issue: ZodIssue): FormikErrors<FormikValues> => {
          return {
            ...errors,
            [issue.path.join('.')]: issue.message
              .replace(/^Validation\serror:\s/, '')
              .replace(/\sat\s".*"$/, '')
          };
        },
        {}
      );
    }
  };
}
