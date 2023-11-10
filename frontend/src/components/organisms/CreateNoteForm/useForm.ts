import {useFormik} from 'formik';
import {formValuesSchema, FormValues} from './FormValues';
import {FormikHelpers} from 'formik/dist/types';
import {FormStatus} from './FormStatus';
import {validateFormWithZod} from '../../../utils/validateFormWithZod';
import {createNote} from '@/lib/createNote';
import {useRouter} from 'next/navigation';
import {Note} from '@/models/Note';

export function useForm() {
  const router = useRouter();

  return useFormik<FormValues>({
    initialStatus: FormStatus.IDLE,
    initialValues: {
      title: '',
      content: ''
    },
    validate: validateFormWithZod(formValuesSchema),
    onSubmit: async (values: FormValues, formikHelpers: FormikHelpers<FormValues>): Promise<void> => {
      formikHelpers.setSubmitting(true);

      try {
        // throw new Error('Test'); <-- lol try it
        const createdNote: Note = await createNote(values);
        router.push(`/${createdNote.id}`);
      } catch (e: unknown) {
        formikHelpers.setStatus(FormStatus.ERROR);
        console.error(e);
      } finally {
        formikHelpers.setSubmitting(false);
      }
    }
  });
}
