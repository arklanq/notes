import './global.css';
import type {Metadata} from 'next';
import {PropsWithChildren} from 'react';
import {Raleway} from 'next/font/google';
import PageShell from '@/components/organisms/PageShell/PageShell';
import { NextFontWithVariable } from 'next/font';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Yet another note taking app'
};

const RalewayFont: NextFontWithVariable = Raleway({
  subsets: ['latin'],
  weight: [
    '300', // 'light'
    '400', // 'regular'
    '500', // 'medium'
    '600', // 'semibold'
    '700' // 'bold'
  ],
  style: ['normal'],
  variable: '--body-font'
});

export default function RootLayout(props: PropsWithChildren) {
  const {children} = props;

  return (
    <html lang='en' className={[RalewayFont.variable, RalewayFont.className].join(' ')}>
      <head>
        <link key={'favicon'} rel='icon' type='image/png' sizes='48x48' href='favicon-48x48.png' />
      </head>
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
