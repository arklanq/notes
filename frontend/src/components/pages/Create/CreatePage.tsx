'use server';
import styles from './CreatePage.module.scss';
import {Container} from '../../atoms/Container/Container';

function CreatePage() {
  return (
    <Container as={'section'} maxWidth={'SM'} className={styles.section}>
      {/*<CreateNoteForm />*/}
    </Container>
  );
}

export default CreatePage;
