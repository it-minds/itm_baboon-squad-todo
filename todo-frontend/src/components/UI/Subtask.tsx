import { FC } from "react";
import { SubtaskModel } from "../../models/SubtaskModel";
import { Title } from "./Title";
import { Deadline } from "./Deadline";

type Props = {
  subtask: SubtaskModel;
};

export const Subtask: FC<Props> = ({ subtask }) => {
  return (
    <div>
        <div className="p-3 flex flex-row justify-evenly rounded-xl border-2 border-red-600 my-5">
        
        <Title title={subtask.Title} />
        <Deadline deadline={subtask.Deadline} />
      </div>
    </div>
  );
};
