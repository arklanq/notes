'use client';

import {memo, useCallback} from 'react';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import {Button} from '@tremor/react';
import {deleteNote} from '@/lib/deleteNote';
import {useRouter} from 'next/navigation';

export interface DeleteNoteButtonProps {
  noteId: number;
}

function DeleteNoteButton(props: DeleteNoteButtonProps) {
  const {noteId} = props;
  const router = useRouter();

  const handleClick = useCallback(async () => {
    const answer: boolean = window.confirm('Are you sure about that?');
    if (answer) {
      await deleteNote(noteId);
      router.push('/');
    }
  }, [noteId, router]);

  return (
    <Button
      variant={'secondary'}
      icon={TrashIcon}
      iconPosition={'left'}
      color={'rose'}
      size={'xs'}
      onClick={handleClick}>
      Delete
    </Button>
  );
}

export default memo(DeleteNoteButton);
