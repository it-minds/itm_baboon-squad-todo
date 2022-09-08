import React, { FC, useState, useEffect, useDebugValue } from "react";
import { AddTodo } from "./AddTodo";
import { Todo } from "./Todo";

import { getData } from "./../../services/api";
import { TodoModel } from "./../../models/TodoModel";
import { SubtaskModel } from "./../../models/SubtaskModel";

type Props = {
  listId: number | undefined;
};

export const TodoList: FC<Props> = ({ listId }) => {
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<TodoModel[] | null>(null);
  const [positionsUpdated, setPositionsUpdated] = useState<boolean>(false);

  useEffect(() => {
    const fetchLists = async () => {
      const result = await getData(
        "https://localhost:7058/TodoList/" + listId?.toString()
      )
        .then((data) => {
          const responseTodos: TodoModel[] = data.todos.$values.map(
            (todoValues: any) => {
              const todo: TodoModel = {
                TodoId: todoValues.todoId,
                TodoListId: data.toDoListId,
                Title: todoValues.title,
                Deadline: todoValues.deadline,
                Checked: todoValues.checked,
                position: todoValues.position,
                subtasks: todoValues.subtasks.$values.map(
                  (subtaskValues: any) => {
                    const subtask: SubtaskModel = {
                      SubTaskId: subtaskValues.subTaskId,
                      Title: subtaskValues.title,
                      Deadline: subtaskValues.deadline,
                      Checked: subtaskValues.checked,
                      Position: subtaskValues.position,
                    };

                    return subtask;
                  }
                ),
              };
              return todo;
            }
          );
          setError(null);
          setTodos(responseTodos);
        })
        .catch((error) => {
          setError(error.message);
          setTodos(null);
        });
    };

    fetchLists();
    setPositionsUpdated(false);
  }, [listId, positionsUpdated]);

  const refetchList = () => {
    setPositionsUpdated(true);
  };

  return (
    <div>
      <AddTodo />
      {todos &&
        todos.map((t) => (
          <Todo key={t.TodoId} todo={t} refetchList={refetchList} />
        ))}
      {!todos?.length && <p className="mt-10">No todos found</p>}
    </div>
  );
};
