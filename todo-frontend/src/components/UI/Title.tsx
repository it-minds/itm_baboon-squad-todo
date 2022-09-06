import { FC } from "react";

type Props = {
    title: string;
  };

export const Title: FC<Props> = ({title}) => {
  return (
      <p>
        {title}
      </p>
  );
};
