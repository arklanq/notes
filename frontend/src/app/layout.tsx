import './global.css';
import type {Metadata} from 'next';
import {PropsWithChildren} from 'react';
import {NextFont} from 'next/dist/compiled/@next/font';
import {Roboto} from 'next/font/google';
import PageShell from '../components/organisms/PageShell/PageShell';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Yet another note taking app'
};

const robotoFont: NextFont = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
});

export default function RootLayout(props: PropsWithChildren) {
  const {children} = props;

  return (
    <html lang='en'>
      <head>
        <link key={'favicon'} rel='icon' type='image/png' sizes='48x48' href='favicon-48x48.png' />
      </head>
      <body className={robotoFont.className}>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
