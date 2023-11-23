'use client';

import {memo, useCallback} from 'react';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import {Button} from '@tremor/react';
import {FormSubmitActionResponse} from '../../pages/Note/FormSubmitActionResponse';
import {submitFormAction} from '../../pages/Note/submitFormAction';
import useBoolean from '@/hooks/useBoolean';

export interface DeleteNoteButtonProps {
  noteId: number;
}

function DeleteNoteButton(props: DeleteNoteButtonProps) {
  const {noteId} = props;
  const [isActionPending, {setTrue: setActionAsPending}] = useBoolean(false);

  const handleClick = useCallback(async () => {
    const answer: boolean = window.confirm('Are you sure about that?');

    if (answer) {
      // Define action pending status
      setActionAsPending();

      // Submit server action
      const response: FormSubmitActionResponse = await submitFormAction(noteId);

      // If response is undefined it means that server action run succesfully and we are awaiting redirection
      if (response === undefined) return;

      // Otherwise we have to check server action response to detect possible errors
      if (response.state === 'error') {
        // Silently fail
        console.error(new Error('Server-side form submission error.'));
      }

    }
  }, [noteId, setActionAsPending]);

  return (
    <Button
      variant={'secondary'}
      icon={TrashIcon}
      iconPosition={'left'}
      color={'rose'}
      size={'xs'}
      onClick={handleClick}
      loading={isActionPending}>
      Delete
    </Button>
  );
}

export default memo(DeleteNoteButton);
