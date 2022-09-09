import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { SubtaskModel } from '../../models/SubtaskModel';
import { putDataById } from './../../services/api';
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
  const [isOpen, setOpen] = useState(false);

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
    if (error !== null) {
      refetchList();
      setError(null);
    }
  }, [error, refetchList]);

  const onNameChanged = (newName: string) => {
    putSubtask({ ...subtask, Title: newName });
  };
  const onDeadlineChanged = (newDeadline: string) => {
    putSubtask({ ...subtask, Deadline: newDeadline });
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
        <SubtaskOptionsButton onClick={() => setOpen(!isOpen)} />
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
            <AddSubtaskDialog position={subtask.Position} todoId={subtask.TodoId} refetchList={refetchList} />
            <RenameSubtaskDialog subtask={subtask} onNameChanged={onNameChanged} />
            <EditDeadlineDialog subtask={subtask} onDeadlineChanged={onDeadlineChanged} />
            <DeleteSubtaskButton subtaskId={subtask.SubTaskId} refetchList={refetchList} />
          </div>
        </div>
      )}
    </div>
  );
};
