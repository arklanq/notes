import {memo, useMemo} from 'react';
import styles from './NoteCard.module.scss';
import {Title, Card, Text} from '@tremor/react';
import clsx from 'clsx';
import {format} from 'date-fns';
import Link from 'next/link';

export interface NoteCardProps {
  id: number;
  title: string;
  content: string;
  lastUpdateDate: Date;
}

function NoteCard(props: NoteCardProps) {
  const {id, title, content, lastUpdateDate} = props;
  const formattedLastUpdateDate: string = useMemo(() => {
    return format(lastUpdateDate, 'dd MMM | hh:mm');
  }, [lastUpdateDate]);

  return (
    <Link href={`/${id.toString()}`} prefetch={false}>
      <Card
        decoration='top'
        decorationColor='indigo'
        className={clsx('card transition-shadow hover:shadow-lg', styles.root)}>
        <div className={clsx('head', styles.head)}>
          <Text>Last update {formattedLastUpdateDate}</Text>
          <Title>{title}</Title>
        </div>
        <div className={clsx('body', styles.body)}>{content}</div>
      </Card>
    </Link>
  );
}

export default memo(NoteCard);
