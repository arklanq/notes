'use server';
import styles from './HomePage.module.scss';
import NoteCard from '../../molecules/NoteCard/NoteCard';
import {Container} from '../../atoms/Container/Container';
import {getAllNotes} from '@/lib/getAllNotes';
import {Note} from '@/models/Note';
import { PageProps } from 'next';

async function HomePage(_props: PageProps) {
  const notes: Note[] = await getAllNotes();

  return (
    <Container as={'section'} className={styles.section} data-testid={'section'}>
      {notes.map((note: Note) => (
        <NoteCard
          testID={'NoteCard'}
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          lastUpdateDate={note.lastUpdateDate}
        />
      ))}
    </Container>
  );
}

export default HomePage;
