import { FC, useState } from "react";
import { TodoModel } from "../../models/TodoModel";
import { Subtask } from "./Subtask";
import { Title } from "./Title";
import { Deadline } from "./Deadline";
import { classNames } from "react-select/dist/declarations/src/utils";

type Props = {
  todo: TodoModel;
};

export const Todo: FC<Props> = ({ todo }) => {
  const [showSubtasks, setShowSubtasks] = useState<boolean>(false);

  return (
    <div>
      <div className="p-3 flex flex-row justify-evenly items-center rounded-xl border-2 border-red-600 my-5">
        {todo.subtasks?.length !== 0 && (
          <button title=">"
          className="text-blue-600 text-3xl rotate-90"
            onClick={() => setShowSubtasks(!showSubtasks)}
          >&gt;</button>
        )}
        <Title title={todo.Title} />
        <Deadline deadline={todo.Deadline} />
      </div>
      {showSubtasks && todo.subtasks?.map((s) => <Subtask subtask={s} />)}
    </div>
  );
};


// className={clsx('sfsafsafsaf', "sadsafasfsa": isChecked)}