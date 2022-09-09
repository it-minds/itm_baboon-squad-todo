import React, { FC, useEffect, useState } from 'react';

import { SubtaskModel } from './../../models/SubtaskModel';
import { TodoModel } from './../../models/TodoModel';
import { getData } from './../../services/api';
import { AddTodo } from './AddTodo';
import { Todo } from './Todo';

type Props = {
  listId: number | undefined;
};

export const TodoList: FC<Props> = ({ listId }) => {
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<TodoModel[] | null>(null);
  const [positionsUpdated, setPositionsUpdated] = useState<boolean>(false);

  useEffect(() => {
    const fetchLists = async () => {
      await getData('https://localhost:7058/TodoList/' + listId?.toString())
        .then((data) => {
          const responseTodos: TodoModel[] = data.todos.$values.map((todoValues: any) => {
            const todo: TodoModel = {
              TodoId: todoValues.todoId,
              TodoListId: data.toDoListId,
              Title: todoValues.title,
              Deadline: todoValues.deadline,
              Checked: todoValues.checked,
              Position: todoValues.position,
              subtasks: todoValues.subtasks.$values.map((subtaskValues: any) => {
                console.log(subtaskValues)
                const subtask: SubtaskModel = {
                  SubTaskId: subtaskValues.subTaskId,
                  Title: subtaskValues.title,
                  Deadline: subtaskValues.deadline,
                  Checked: subtaskValues.checked,
                  Position: subtaskValues.position,
                  TodoId:subtaskValues.TodoId
                };

                return subtask;
              }),
            };
            return todo;
          });
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

  if (error) {
    return <p>Error during fetch</p>;
  }

  return (
    <div>
      <AddTodo />
      {todos && todos?.sort((s1, s2) => s1.Position - s2.Position)
      .map((t) => <Todo key={t.TodoId} todo={t} todoMinPosition={Math.min(...todos.map((s) => s.Position))}
              todoMaxPosition={Math.max(...todos.map((s) => s.Position))} refetchList={refetchList} />)}
      {!todos?.length && <p className="mt-10">No todos found</p>}
    </div>
  );
};
