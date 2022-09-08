import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { SubtaskModel } from '../../models/SubtaskModel';
import { deleteDataById, putDataById } from './../../services/api';
import { AddSubtaskAboveButton } from './AddSubtaskAboveButton';
import { AddSubtaskBelowButton } from './AddSubtaskBelowButton';
import { Deadline } from './Deadline';
import { DeleteSubtaskButton } from './DeleteSubtaskButton';
import { EditSubtaskDeadlineButton } from './EditSubtaskDeadlineButton';
import { MarkCheckedButton } from './MarkCheckedButton';
import { MoveUpDownButton } from './MoveUpDownButton.tsx';
import { RenameSubtaskButton } from './RenameSubtaskButton';
import { SubtaskOptionsButton } from './SubtaskOptionsButton';
import { Title } from './Title';

type Props = {
  subtask: SubtaskModel;
  subtasksMinPosition: number;
  subtasksMaxPosition: number;
  refetchList: () => void;
};

export const Subtask: FC<Props> = ({ subtask, subtasksMinPosition, subtasksMaxPosition, refetchList }) => {
  const today = new Date();
  const deadline = new Date(subtask.Deadline?.split('T', 1)[0] ?? '');

  const [error, setError] = useState<string | null>(null);
  const [task, setTask] = useState<SubtaskModel>(subtask);
  const [updated, setUpdated] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const putSubtask = async () => {
      await putDataById('https://localhost:7058/Subtask', task)
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
  }, [task, updated, refetchList]);

  useEffect(() => {
    const deleteSubtask = async () => {
      await deleteDataById('https://localhost:7058/Subtask', '/' + task.SubTaskId.toString())
        .then(() => {
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
      setDeleted(false);
      refetchList();
    };
    if (deleted) {
      deleteSubtask();
    }
  }, [deleted, refetchList, task.SubTaskId]);

  useEffect(() => {
    if (error !== null) {
      refetchList();
      setError(null);
    }
  }, [error, refetchList]);

  const onclick = () => {
    setOpen(!isOpen);
  };

  const onAddAboveClick = () => {
    console.log('you pressed add above');
  };
  const onAddBelowClick = () => {
    console.log('you pressed add below');
  };
  const onRenameClick = () => {
    console.log('you pressed rename');
  };
  const onEditDeadlineClick = () => {
    console.log('you pressed edit deadline');
  };
  const onDeleteClick = () => {
    console.log('you pressed delete');
    setTask({ ...task });
    setDeleted(true);
  };
  return (
    <div>
      <div
        className={clsx('p-3 flex flex-row flex-auto justify border-2 border-red-600 h-14 ml-5 my-2', {
          'bg-red-600': today > deadline,
          'bg-green-500': subtask.Checked,
        })}
      >
        <div className="flex-auto">
          <Title title={subtask.Title} />
        </div>
        <div className="flex-1">
          <Deadline deadline={subtask.Deadline} />
        </div>
        <MarkCheckedButton
          checked={task.Checked}
          onChange={() => {
            setTask({ ...task, Checked: !task.Checked });
            setUpdated(true);
          }}
        />
        <SubtaskOptionsButton onClick={onclick} />
        <MoveUpDownButton
          onClick={(dir: string) => {
            setTask({
              ...task,
              Position:
                dir === 'moveUp'
                  ? task.Position > subtasksMinPosition
                    ? task.Position - 1
                    : subtasksMinPosition
                  : task.Position < subtasksMaxPosition
                  ? task.Position + 1
                  : subtasksMaxPosition,
            });
            setUpdated(true);
          }}
        />
      </div>

      {isOpen && (
        <div className="flex flex-col">
          <AddSubtaskAboveButton OnAddAboveClick={onAddAboveClick} />
          <AddSubtaskBelowButton OnAddBelowClick={onAddBelowClick} />
          <RenameSubtaskButton OnRenameClick={onRenameClick} />
          <EditSubtaskDeadlineButton OnEditDeadlineClick={onEditDeadlineClick} />
          <DeleteSubtaskButton OnDeleteClick={onDeleteClick} />
        </div>
      )}
    </div>
  );
};
