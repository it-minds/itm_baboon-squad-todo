import { FC } from "react";
import clsx from 'clsx';

type Props = {
    subtasksShowed?: boolean;
    title: string;
  };

export const Title: FC<Props> = ({subtasksShowed ,title}) => {
  return (
      <p className={clsx({"ml-50": subtasksShowed})}>
        {title}
      </p>
  );
};
