import {FormikValues} from 'formik/dist/types';
import {z} from 'zod';

export interface FormValues extends FormikValues {
  title: string;
  content: string;
}

export const formValuesSchema: z.ZodType<FormValues> = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(65535) // Optimal length for SQL "TEXT" column
});
