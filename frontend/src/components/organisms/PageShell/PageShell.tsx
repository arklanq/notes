'use server';
import {PropsWithChildren} from 'react';
import {Text, Subtitle, Title} from '@tremor/react';
import styles from './PageShell.module.scss';
import {Container} from '../../atoms/Container/Container';
import NewNoteButton from './NewNoteButton';
import ClientEffects from './ClientSideConfiguration';
import Link from 'next/link';

async function PageShell(props: PropsWithChildren) {
  const {children} = props;

  return (
    <>
      <ClientEffects />

      <Container as={'header'} className={styles.header}>
        <Link href={'/'} className={styles.body} prefetch={false}>
          <Title>Notes.app</Title>
          <Text>Yet another note taking app.</Text>
        </Link>
        <div className={styles.actions}>
          <NewNoteButton />
        </div>
      </Container>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <Subtitle>Copyright should go here ¯\_(ツ)_/¯</Subtitle>
      </footer>
    </>
  );
}

export default PageShell;
