'use server';
import styles from './Home.module.scss';
import NoteCard from '../../molecules/NoteCard/NoteCard';
import { Container } from "../../atoms/Container/Container";
import { getAllNotes } from "@/lib/getAllNotes";
import { Note } from "@/models/Note";

async function HomePage() {
  const notes: Note[] = await getAllNotes();

  return (
    <Container as={'section'} className={styles.section}>
      {notes.map((note: Note) => (
        <NoteCard
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