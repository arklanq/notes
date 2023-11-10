'use client';
import {memo} from 'react';
import {TextInput, Textarea, Text, Button, Callout} from '@tremor/react';
import styles from './CreateNoteForm.module.scss';
import {useForm} from './useForm';
import Link from 'next/link';
import {FormStatus} from './FormStatus';

function CreateNoteForm() {
  const {isSubmitting, status, values, handleChange, touched, handleBlur, errors, handleSubmit} = useForm();

  return (
    <>
      {status === FormStatus.ERROR && (
        <Callout title='Ohh no! Wild error appeared!' color={'rose'} className={styles.errorCallout}>
          Something went wrong, please try again later.
        </Callout>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <Text>Title</Text>
          <TextInput
            name={'title'}
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.title && Boolean(errors.title)}
            errorMessage={errors.title}
            placeholder={'Short summary?'}
          />
        </div>

        <div className={styles.field}>
          <Text>Content</Text>
          <Textarea
            name={'content'}
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.content && Boolean(errors.content)}
            errorMessage={errors.content}
            placeholder={'...'}
            rows={10}
          />
        </div>

        <div className={styles.actions}>
          <Button
            type={'submit'}
            variant={'primary'}
            loading={isSubmitting}
            className={styles.submitButton}
            color={status === FormStatus.SUCCESS ? 'green' : 'blue'}>
            Submit
          </Button>
          <Link href={'/'} style={{height: 20}}>
            <Button variant={'light'}>Back to notes</Button>
          </Link>
        </div>
      </form>
    </>
  );
}

export default memo(CreateNoteForm);
