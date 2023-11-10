'use client';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import {Icon} from '@tremor/react';
import Link from 'next/link';
import {memo} from 'react';

function NewNoteButton() {
  return (
    <Link href={'/create'}>
      <Icon icon={PencilIcon} variant={'light'} size='md' />
    </Link>
  );
}

export default memo(NewNoteButton);
