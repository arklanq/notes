'use server';

import {Button} from '@tremor/react';
import {PencilIcon} from './icons';
import Link from 'next/link';

export interface DeleteNoteButtonProps {
  noteId: number;
}

async function EditNoteButton(props: DeleteNoteButtonProps) {
  const {noteId} = props;

  return (
    <Link href={`/edit/${noteId}`} prefetch={false}>
      <Button variant={'secondary'} icon={PencilIcon} iconPosition={'left'} color={'blue'} size={'xs'}>
        Edit
      </Button>
    </Link>
  );
}

export default EditNoteButton;
