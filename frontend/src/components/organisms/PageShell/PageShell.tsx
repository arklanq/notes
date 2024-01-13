'use server';
import {PropsWithChildren} from 'react';
import styles from './PageShell.module.scss';
import ClientSideConfiguration from './ClientSideConfiguration';
import Navbar from '../Navbar/Navbar';

async function PageShell(props: PropsWithChildren) {
  const {children} = props;

  return (
    <>
      <ClientSideConfiguration />

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        {/*<Subtitle>Copyright should go here ¯\_(ツ)_/¯</Subtitle>*/}
      </footer>
    </>
  );
}

export default PageShell;
