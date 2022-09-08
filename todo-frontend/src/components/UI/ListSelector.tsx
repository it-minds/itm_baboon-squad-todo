import './../../index.css';

import { FC, useEffect, useState } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';

import { getData } from './../../services/api';
import { TodoList } from './TodoList';

type TodoList = {
  value: number;
  label: string;
};

export const ListSelector: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [lists, setLists] = useState<TodoList[]>();
  const [selectedList, setSelectedList] = useState<number | undefined>();

  useEffect(() => {
    const fetchLists = async () => {
      const result = await getData('https://localhost:7058/TodoList')
        .then((data) => {
          const responseLists: TodoList[] = data.$values.map((todoListvalues: any) => {
            const todoList: TodoList = {
              value: todoListvalues.toDoListId,
              label: todoListvalues.title,
            };
            return todoList;
          });
          setError(null);
          setLists(responseLists);
        })
        .catch((error) => {
          setError(error.message);
          setLists([]);
        });
    };

    fetchLists();
  }, []);

  const onListSelect: (newValue: SingleValue<TodoList>, actionMeta: ActionMeta<TodoList>) => void = (e) => {
    setSelectedList(e?.value);
  };

  return (
    <div>
      <div className="mb-10">
        <p>Select todo list:</p>
        <Select options={lists} onChange={onListSelect} />
      </div>
      {selectedList && <TodoList listId={selectedList} />}
      {!selectedList && <p>Pick list to see todos</p>}
    </div>
  );
};

export default ListSelector;
