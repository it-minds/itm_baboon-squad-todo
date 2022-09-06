import { FC } from "react";

type Props = {
  deadline?: string;
};

export const Deadline: FC<Props> = ({ deadline }) => {
  return <p>{deadline}</p>;
};
