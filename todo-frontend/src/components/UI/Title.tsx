import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  subtasksShowed?: boolean;
  title: string;
};

export const Title: FC<Props> = ({ subtasksShowed, title }) => {
  return <p className={clsx({ 'ml-50': subtasksShowed })}>{title}</p>;
};
