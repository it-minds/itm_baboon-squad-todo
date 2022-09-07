import { FC, useState, useEffect } from "react";
import { TodoModel } from "../../models/TodoModel";
import { Subtask } from "./Subtask";
import { Title } from "./Title";
import { Deadline } from "./Deadline";
import clsx from 'clsx';
import { MarkCheckedButton } from "./MarkCheckedButton";
import { putDataById } from "../../services/api";

type Props = {
  todo: TodoModel;
};

export const Todo: FC<Props> = ({ todo }) => {
  const [showSubtasks, setShowSubtasks] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [task, setTask] = useState<TodoModel>(todo);
  const [updated, setUpdated] = useState<boolean>(false)

  useEffect(() => {
    const putTodo = async () => {
      const result = await putDataById("https://localhost:7058/Todo", task)
        .then((data) => {
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
        });
    };
    if (updated) {
      putTodo();
      setUpdated(false);
    }
  }, [task, updated]);

  return (
    <div>
      <div className="p-3 flex flex-row items-center rounded-xl border-2 border-red-600 my-5">
        {todo.subtasks?.length !== 0 && (
          <button className={clsx("text-blue-600 text-3xl mx-5 items-center transition duration-300", {"rotate-90": showSubtasks})}
            onClick={() => setShowSubtasks(!showSubtasks)}
          >&gt;</button>
        )}
        <Title subtasksShowed={showSubtasks} title={todo.Title} />
        <Deadline deadline={todo.Deadline} />
        <MarkCheckedButton
          checked={task.Checked}
          onChange={() => {
            setTask({ ...task, Checked: !task.Checked });
            setUpdated(true);
          }}
        />
      </div>
      {showSubtasks && todo.subtasks?.sort((s1,s2)=>s1.Position - s2.Position).map((s) => <Subtask key={s.SubTaskId} subtask={s}/>)}
    </div>
  );
};