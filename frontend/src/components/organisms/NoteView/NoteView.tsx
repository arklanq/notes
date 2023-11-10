'use server';

import {Note} from '@/models/Note';
import {Card, Title, Text} from '@tremor/react';
import styles from './NoteView.module.scss';
import React, {useMemo} from 'react';
import {format} from 'date-fns';
import DeleteNoteButton from './DeleteNoteButton';
import EditNoteButton from './EditNoteButton';

export interface NoteViewProps {
  note: Note;
}

async function NoteView(props: NoteViewProps) {
  const {note} = props;
  const {id, title, content, createDate, lastUpdateDate} = note;

  const formattedCreateDate: string = useMemo(() => {
    return format(createDate, 'dd MMM | hh:mm');
  }, [createDate]);
  const formattedLastUpdateDate: string = useMemo(() => {
    return format(lastUpdateDate, 'dd MMM | hh:mm');
  }, [lastUpdateDate]);

  return (
    <div className={styles.view}>
      <Card className={styles.noteCard}>
        <Title>{title}</Title>
        <Text className='text-tremor-content-emphasis'>{content}</Text>
      </Card>

      <Card className={styles.detailsCard}>
        <Text className='text-tremor-content-subtle'>Created {formattedCreateDate}</Text>
        <Text className='text-tremor-content-subtle'>Last update {formattedLastUpdateDate}</Text>
        <div className={styles.actions}>
          <EditNoteButton noteId={id} />
          <DeleteNoteButton noteId={id} />
        </div>
      </Card>
    </div>
  );
}

export default NoteView;
