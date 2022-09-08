import { FC, useState, useEffect } from "react";
import { SubtaskModel } from "../../models/SubtaskModel";
import { Title } from "./Title";
import { Deadline } from "./Deadline";
import clsx from "clsx";
import { MarkCheckedButton } from "./MarkCheckedButton";
import { putDataById } from "./../../services/api";
import { MoveUpDownButton } from "./MoveUpDownButton.tsx";

type Props = {
  subtask: SubtaskModel;
  subtasksCount: number;
  refetchList: () => void;
};

export const Subtask: FC<Props> = ({ subtask, subtasksCount, refetchList }) => {
  const today = new Date();
  const deadline = new Date(subtask.Deadline?.split("T", 1)[0] ?? "");

  const [error, setError] = useState<string | null>(null);
  const [task, setTask] = useState<SubtaskModel>(subtask);
  const [updated, setUpdated] = useState<boolean>(false);

  useEffect(() => {
    const putSubtask = async () => {
      const result = await putDataById("https://localhost:7058/Subtask", task)
        .then((data) => {
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
      setUpdated(false);
      refetchList();
    };
    if (updated) {
      putSubtask();
    }
  }, [task]);

  useEffect(()=>{
    if (error!==null){
        refetchList();
        setError(null);
    }
  },[error])

  return (
    <div>
      <div
        className={clsx(
          "p-3 flex flex-row justify items-center rounded-xl border-2 border-red-600 my-5",
          { "bg-red-600": today > deadline }
        )}
      >
        <Title title={subtask.Title} />
        <Deadline deadline={subtask.Deadline} />
        <MarkCheckedButton
          checked={task.Checked}
          onChange={() => {
            setTask({ ...task, Checked: !task.Checked });
            setUpdated(true);
          }}
        />
        <MoveUpDownButton
          onClick={(dir: string) => {
            setTask({
              ...task,
              Position:
                dir === "moveUp"
                  ? task.Position !== 0
                    ? task.Position - 1
                    : task.Position
                  : task.Position === subtasksCount - 1
                  ? task.Position
                  : task.Position + 1,
            });
            setUpdated(true);
          }}
        />
      </div>
    </div>
  );
};
