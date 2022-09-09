import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { SubtaskModel } from '../../models/SubtaskModel';
import { deleteDataById, postData, putDataById } from './../../services/api';
import { AddSubtaskDialog } from './AddSubtaskDialog';
import { Deadline } from './Deadline';
import { DeleteSubtaskButton } from './DeleteSubtaskButton';
import { EditDeadlineDialog } from './EditDeadlineDialog';
import { MarkCheckedButton } from './MarkCheckedButton';
import { MoveUpDownButton } from './MoveUpDownButton.tsx';
import { RenameSubtaskDialog } from './RenameSubtaskDialog';
import { SubtaskOptionsButton } from './SubtaskOptionsButton';
import { Title } from './Title';

type SubtaskNoId = Omit<SubtaskModel, 'id' | 'SubTaskId' | 'Checked'>;

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
  const [deleted, setDeleted] = useState<boolean>(false);
  const [isOpen, setOpen] = useState(false);

  const addSubtask = async (newTask: SubtaskNoId) => {
    return await postData('https://localhost:7058/Subtask', newTask)
      .then(() => {
        refetchList();
      })
      .catch((error) => {});
  };

  const putSubtask = async (t: SubtaskModel) => {
    await putDataById('https://localhost:7058/Subtask', t)
      .then((data) => {
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
    refetchList();
  };

  useEffect(() => {
    const deleteSubtask = async () => {
      await deleteDataById('https://localhost:7058/Subtask', '/' + subtask.SubTaskId.toString())
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
  }, [deleted, refetchList, subtask.SubTaskId]);

  useEffect(() => {
    if (error !== null) {
      refetchList();
      setError(null);
    }
  }, [error, refetchList]);

  const onclick = () => {
    setOpen(!isOpen);
  };

  const onSubtaskAboveAdded = async (newName: string, newDeadline: string) => {
    console.log(subtask.Position);
    console.log({ newDeadline, a: subtask.Position - 1 });
    const newTask = await addSubtask({
      Title: newName,
      Position: subtask.Position - 1,
      Deadline: newDeadline,
      TodoId: subtask.TodoId,
    });

    console.log({ newTask });
  };
  const onSubtaskBelowAdded = async (newName: string, newDeadline: string) => {
    console.log(subtask.Position);
    console.log({ newDeadline, a: subtask.Position + 1 });
    const newTask = await addSubtask({
      Title: newName,
      Position: subtask.Position + 1,
      Deadline: newDeadline,
      TodoId: subtask.TodoId,
    });

    console.log({ newTask });
  };
  const onNameChanged = (newName: string) => {
    putSubtask({ ...subtask, Title: newName });
  };
  const onDeadlineChanged = (newDeadline: string) => {
    putSubtask({ ...subtask, Deadline: newDeadline });
  };
  const onDeleteClick = () => {
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
          checked={subtask.Checked}
          onChange={() => {
            putSubtask({ ...subtask, Checked: !subtask.Checked });
          }}
        />
        <SubtaskOptionsButton onClick={onclick} />
        <MoveUpDownButton
          onClick={(dir: string) => {
            putSubtask({
              ...subtask,
              Position:
                dir === 'moveUp'
                  ? subtask.Position > subtasksMinPosition
                    ? subtask.Position - 1
                    : subtasksMinPosition
                  : subtask.Position < subtasksMaxPosition
                  ? subtask.Position + 1
                  : subtasksMaxPosition,
            });
          }}
        />
      </div>

      {isOpen && (
        <div className="flex justify-end">
          <div className="flex flex-col w-1/5 bg-gray-500 max-w text-left">
            <AddSubtaskDialog onSubtaskAboveAdded={onSubtaskAboveAdded} onSubtaskBelowAdded={onSubtaskBelowAdded} />
            <RenameSubtaskDialog subtask={subtask} onNameChanged={onNameChanged} />
            <EditDeadlineDialog subtask={subtask} onDeadlineChanged={onDeadlineChanged} />
            <DeleteSubtaskButton OnDeleteClick={onDeleteClick} />
          </div>
        </div>
      )}
    </div>
  );
};
