import { FC, useState } from "react";
import { TodoModel } from "../../models/TodoModel";
import { Subtask } from "./Subtask";
import { Title } from "./Title";
import { Deadline } from "./Deadline";
import clsx from 'clsx';

type Props = {
  todo: TodoModel;
};

export const Todo: FC<Props> = ({ todo }) => {
  const [showSubtasks, setShowSubtasks] = useState<boolean>(false);
  const [showTodoOptions, setShowTodoOptions]=useState<boolean>(false);

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
      </div>
      {showSubtasks && todo.subtasks?.map((s) => <Subtask key={s.SubTaskId} subtask={s}/>)}
    </div>
  );
};



// className={clsx('sfsafsafsaf', "sadsafasfsa": isChecked)}