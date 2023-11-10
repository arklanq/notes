'use server';
import styles from './NotePage.module.scss';
import {Container} from '../../atoms/Container/Container';
import {Note} from '@/models/Note';
import {getNote} from '../../../lib/getNote';
import {notFound} from 'next/navigation';
import {NoteNotFoundException} from '../../../exceptions/NoteNotFoundException';
import {unstable_noStore as noStore} from 'next/cache';
import NoteView from "../../organisms/NoteView/NoteView";

async function NotePage(props: {params: { id: string }}) {
  noStore();

  const {params} = props;
  const id: number = parseInt(params.id);
  if (isNaN(id)) return void notFound(); // never

  let note: Note
  try {
    note = await getNote(id);
  } catch (e: unknown) {
    if (e instanceof NoteNotFoundException) return void notFound(); // never
    else throw e; // forward error up to trigger internal server error (500)
  }

  return (
    <Container as={'section'} maxWidth={'MD'} className={styles.section}>
      <NoteView note={note} />
    </Container>
  );
}

export default NotePage;
