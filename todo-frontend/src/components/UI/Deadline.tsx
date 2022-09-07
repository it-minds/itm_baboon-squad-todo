import { FC } from "react";

type Props = {
  deadline?: string;
};

export const Deadline: FC<Props> = ({ deadline }) => {
  return <p className="mx-10">{deadline?.split('T',1)}</p>;
};
