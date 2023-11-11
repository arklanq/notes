import {useFormik} from 'formik';
import {formValuesSchema, FormValues} from './FormValues';
import {FormikHelpers} from 'formik/dist/types';
import {FormStatus} from './FormStatus';
import {validateFormWithZod} from '@/utils/validateFormWithZod';
import {Note} from '@/models/Note';
import {FormSubmitActionResponse} from '../../pages/Edit/FormSubmitActionResponse';
import {submitFormAction} from '../../pages/Edit/submitFormAction';

export function useForm(note: Note) {
  return useFormik<FormValues>({
    initialStatus: FormStatus.IDLE,
    initialValues: {
      title: note.title,
      content: note.content
    },
    validate: validateFormWithZod(formValuesSchema),
    onSubmit: async (values: FormValues, formikHelpers: FormikHelpers<FormValues>): Promise<void> => {
      formikHelpers.setSubmitting(true);

      try {
        // throw new Error('Test'); <-- lol try it

        const response: FormSubmitActionResponse = await submitFormAction(note.id, values);

        // If response is undefined it means that server action run succesfully and we are awaiting redirection
        if (response === undefined) return;

        // Otherwise we have to check server action response to detect possible errors
        if (response.state === 'error') throw new Error('Server-side form submission error.');
      } catch (e: unknown) {
        formikHelpers.setStatus(FormStatus.ERROR);
        console.error(e);
      } finally {
        formikHelpers.setSubmitting(false);
      }
    }
  });
}
