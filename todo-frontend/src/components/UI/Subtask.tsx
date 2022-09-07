import { FC } from "react";
import { SubtaskModel } from "../../models/SubtaskModel";
import { Title } from "./Title";
import { Deadline } from "./Deadline";
import clsx from 'clsx'

type Props = {
  subtask: SubtaskModel;
};

export const Subtask: FC<Props> = ({ subtask }) => {
    const today = new Date()
    const deadline = new Date(subtask.Deadline?.split('T',1)[0] ?? "")
  return (
    <div>
        <div className={clsx("p-3 flex flex-row justify rounded-xl border-2 border-red-600 my-5", {"bg-red-600":(new Date() > new Date(subtask.Deadline?.split('T',1)[0] ?? ""))})}>
        
        <Title title={subtask.Title} />
        <Deadline deadline={subtask.Deadline} />
      </div>
    </div>
  );
};
