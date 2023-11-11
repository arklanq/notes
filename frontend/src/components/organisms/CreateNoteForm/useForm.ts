import {useFormik} from 'formik';
import {formValuesSchema, FormValues} from './FormValues';
import {FormikHelpers} from 'formik/dist/types';
import {FormStatus} from './FormStatus';
import {validateFormWithZod} from '@/utils/validateFormWithZod';
import {submitFormAction} from '../../pages/Create/submitFormAction';
import {FormSubmitActionResponse} from '../../pages/Create/FormSubmitActionResponse';

export function useForm() {
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

        const response: FormSubmitActionResponse = await submitFormAction(values);

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
