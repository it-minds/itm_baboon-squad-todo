import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { GoTriangleRight } from 'react-icons/go';
import {TbExclamationMark} from 'react-icons/tb';

import { TodoModel } from '../../models/TodoModel';
import { putDataById } from '../../services/api';
import { Deadline } from './Deadline';
import { MarkCheckedButton } from './MarkCheckedButton';
import { Subtask } from './Subtask';
import { Title } from './Title';


type Props = {
  todo: TodoModel;
  refetchList: () => void;
};

export const Todo: FC<Props> = ({ todo, refetchList }) => {
  const today = new Date();
  const deadline = new Date(todo.Deadline?.split('T', 1)[0] ?? '');
  

  const [showSubtasks, setShowSubtasks] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [task, setTask] = useState<TodoModel>(todo);
  const [updated, setUpdated] = useState<boolean>(false);
  const [subtaskDeadline, setSubtaskDeadline] = useState<boolean>(false);

  useEffect (()=>{
    setSubtaskDeadline(false)
    var x = false
    todo.subtasks?.forEach(s => {
    if (s.Deadline){
      const sd = new Date(s.Deadline.split('T', 1)[0] ?? '') 
        if (sd<today && !s.Checked) {
          x = true;
        }
      }
    });
    if (x) {
      setSubtaskDeadline(true)
    }
  },[todo])

  useEffect(() => {
    const putTodo = async () => {
      await putDataById('https://localhost:7058/Todo', task)
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
      putTodo();
    }
  }, [task, updated, refetchList]);

  useEffect(() => {
    if (error !== null) {
      refetchList();
      setError(null);
    }
  }, [error, refetchList]);

  return (
    <div onDoubleClick={() => setShowSubtasks(!showSubtasks)}>
      <div
        className={clsx('p-3 flex flex-row items-center border-2 border-red-600 h-16 mt-5', {
          'bg-red-600': today > deadline,
          'bg-green-500': todo.Checked,
        })}
      >
        <div className="items-center w-20">
          {todo.subtasks?.length !== 0 && (
            <button
              className={clsx('text-blue-600 text-3xl items-center transition duration-300', {
                'rotate-90': showSubtasks,
              })}
              onClick={() => setShowSubtasks(!showSubtasks)}
            >
              <GoTriangleRight />
            </button>
          )}
        </div>
        <div className="flex-auto">
          <Title subtasksShowed={showSubtasks} title={todo.Title} />
        </div>
        <div className='w-2'>
        { subtaskDeadline  &&
             <TbExclamationMark className='text-5xl'/>
            }   
            </div>
        <div className="flex-1">
          <Deadline deadline={todo.Deadline} />
        </div>
        <MarkCheckedButton
          checked={task.Checked}
          onChange={() => {
            setTask({ ...task, Checked: !task.Checked });
            setUpdated(true);
          }}
        />
      </div>
      {showSubtasks &&
        todo.subtasks
          ?.sort((s1, s2) => s1.Position - s2.Position)
          .map((s) => (
            <Subtask
              key={s.SubTaskId}
              subtask={s}
              subtasksMinPosition={Math.min(...todo.subtasks!.map((s) => s.Position))}
              subtasksMaxPosition={Math.max(...todo.subtasks!.map((s) => s.Position))}
              refetchList={() => refetchList()}
            />
          ))}
    </div>
  );
};
