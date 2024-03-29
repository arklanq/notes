'use server';
import styles from './EditPage.module.scss';
import {Container} from '../../atoms/Container/Container';
import {notFound} from 'next/navigation';
import {Note} from '@/models/Note';
import {getNote} from '@/lib/getNote';
import {NoteNotFoundException} from '@/exceptions/NoteNotFoundException';
import { PageProps } from 'next';

async function EditPage(props: PageProps<{id: string}>) {
  const {params} = props;
  const id: number = parseInt(params.id);
  if (isNaN(id)) return void notFound(); // never

  let note: Note;
  try {
    note = await getNote(id);
  } catch (e: unknown) {
    if (e instanceof NoteNotFoundException) return void notFound(); // never
    else throw e; // forward error up to trigger internal server error (500)
  }

  return (
    <Container as={'section'} maxWidth={'SM'} className={styles.section}>
      {/*<EditNoteForm note={note} />*/}
    </Container>
  );
}

export default EditPage;
