import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';

import { SubtaskModel } from '../../models/SubtaskModel';
import { deleteDataById, postData, putDataById } from './../../services/api';
import { AddSubtaskAboveButton } from './AddSubtaskAboveButton';
import { AddSubtaskBelowButton } from './AddSubtaskBelowButton';
import { NewSubtaskModel } from '../../models/NewSubtaskModel';
import { Deadline } from './Deadline';
import { DeleteSubtaskButton } from './DeleteSubtaskButton';
import { RenameSubtaskDialog } from './RenameSubtaskDialog';
import { MarkCheckedButton } from './MarkCheckedButton';
import { MoveUpDownButton } from './MoveUpDownButton.tsx';
import { AddSubtaskDialog } from './AddSubtaskDialog';
import { SubtaskOptionsButton } from './SubtaskOptionsButton';
import { EditDeadlineDialog } from './EditDeadlineDialog';
import { Title } from './Title';

type SubtaskNoId = Omit<SubtaskModel, "id" | "SubTaskId" | "Checked">



const addSubtask = async (newTask: SubtaskNoId) => {
  return await postData('https://localhost:7058/Subtask', newTask)
  //   .then(() => {
  //     setError(null);
  //   })
  //   .catch((error) => {
  //     setError(error.message);
  //   });
  // setDeleted(false);
  // refetchList();
};
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
  const [addNew, setAddNew]= useState<boolean>(false);

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

  const onSubtaskAboveAdded =async (newName:string, newDeadline: string)=>{
    console.log(task.Position)
    console.log({newDeadline, a: task.Position - 1})
    const newTask = await addSubtask({
      Title: newName,
      Position: task.Position - 1,
      Deadline: newDeadline,
      TodoId: task.TodoId
    });

    console.log({newTask})
  }
  const onSubtaskBelowAdded =async (newName:string, newDeadline: string)=>{
    console.log(task.Position)
    console.log({newDeadline, a: task.Position + 1})
    const newTask = await addSubtask({
      Title: newName,
      Position: task.Position + 1,
      Deadline: newDeadline,
      TodoId: task.TodoId
    });

    console.log({newTask})
  }
  const onNameChanged =(newName:string)=>{
    setTask({ ...task, Title: newName});
    setUpdated(true);
  }
  const onDeadlineChanged =(newDeadline: string)=>{
    setTask({ ...task, Deadline: newDeadline});
    setUpdated(true);
  }
  const onDeleteClick = () => {
    console.log('you pressed delete');
    setTask({ ...task });
    setDeleted(true);
  };
  console.log(task.TodoId)
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
     
      {isOpen&& <div className='flex justify-end'>
        <div className="flex flex-col w-1/5 bg-gray-500 max-w text-left">
        <AddSubtaskDialog onSubtaskAboveAdded={onSubtaskAboveAdded} onSubtaskBelowAdded={onSubtaskBelowAdded}/>
        <RenameSubtaskDialog subtask={subtask} onNameChanged={onNameChanged}/>
        <EditDeadlineDialog subtask={subtask} onDeadlineChanged={onDeadlineChanged}/>
        <DeleteSubtaskButton 
           OnDeleteClick={onDeleteClick}
           />
           </div>
      </div>
        
       }
    </div>
  );
};
