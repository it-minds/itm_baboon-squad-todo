import { FC, useState, useEffect } from "react";
import { SubtaskModel } from "../../models/SubtaskModel";
import { Title } from "./Title";
import { Deadline } from "./Deadline";
import clsx from "clsx";
import { MarkCheckedButton } from "./MarkCheckedButton";
import { MoveUpDownButton } from "./MoveUpDownButton.tsx";
import { deleteDataById, putDataById } from "./../../services/api";
import { SubtaskOptionsButton } from "./SubtaskOptionsButton";
import { AddSubtaskAboveButton } from "./AddSubtaskAboveButton";
import { AddSubtaskBelowButton } from "./AddSubtaskBelowButton";
import { DeleteSubtaskButton } from "./DeleteSubtaskButton";
import { EditSubtaskDeadlineButton } from "./EditSubtaskDeadlineButton";
import { RenameSubtaskButton } from "./RenameSubtaskButton";
import { classNames } from "react-select/dist/declarations/src/utils";

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
  const [deleted, setDeleted] = useState<boolean>(false);
  const [isOpen, setOpen] = useState(false);

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

    const deleteSubtask = async () => {
      const result = await deleteDataById(
        "https://localhost:7058/Subtask",
        "/" + task.SubTaskId.toString()
      )
        .then(() => {
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
    };
    if (updated) {
      putSubtask();
    }
    if (deleted) {
      deleteSubtask();
      setDeleted(false);
    }
  }, [task]);

  useEffect(() => {
    if (error !== null) {
      refetchList();
      setError(null);
    }
  }, [error]);

  const onclick = () => {
    setOpen(!isOpen);
  };

  const onAddAboveClick = () => {
    console.log("you pressed add above");
  };
  const onAddBelowClick = () => {
    console.log("you pressed add below");
  };
  const onRenameClick = () => {
    console.log("you pressed rename");
  };
  const onEditDeadlineClick = () => {
    console.log("you pressed edit deadline");
  };
  const onDeleteClick = () => {
    console.log("you pressed delete");
    setTask({ ...task });
    setDeleted(true);
  };
  return (
    <div>
      <div
        className={clsx(
          "p-3 flex flex-row flex-auto justify rounded-xl border-2 border-red-600 my-5 0",
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
        <div className="row">
          {" "}
          <SubtaskOptionsButton onClick={onclick} />
        </div>
      </div>

      {isOpen && (
        <div className="flex flex-col">
          <AddSubtaskAboveButton OnAddAboveClick={onAddAboveClick} />
          <AddSubtaskBelowButton OnAddBelowClick={onAddBelowClick} />
          <RenameSubtaskButton OnRenameClick={onRenameClick} />
          <EditSubtaskDeadlineButton
            OnEditDeadlineClick={onEditDeadlineClick}
          />
          <DeleteSubtaskButton OnDeleteClick={onDeleteClick} />
        </div>
      )}
    </div>
  );
};
