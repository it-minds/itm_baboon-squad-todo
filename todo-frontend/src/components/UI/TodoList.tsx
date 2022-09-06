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
  const [todos, setTodos] = useState<TodoModel[]>();

  useEffect(() => {
    const fetchLists = async () => {
      const result = await getData(
        "https://localhost:7058/TodoListGetOne/" + listId?.toString()
      )
        .then((data) => {
          const responseTodos: TodoModel[] = data.todos.$values.map(
            (todoValues: any) => {
              const todo: TodoModel = {
                TodoId: todoValues.todoId,
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
          console.log(responseTodos);
        })
        .catch((error) => {
          setError(error.message);
          setTodos([]);
        });
    };
    fetchLists();
  }, [listId]);

  return (
    <div>
      <AddTodo />
      {todos !== undefined &&
        todos.map((t) => <Todo key={t.TodoId} todo={t} />)}
    </div>
  );
};
