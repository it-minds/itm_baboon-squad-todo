import './../../index.css';

import { FC, useEffect, useState } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';

import { TodoListModel } from '../../models/TodoListModel';
import { getData } from './../../services/api';
import { TodoList } from './TodoList';

export const ListSelector: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [lists, setLists] = useState<TodoListModel[]>();
  const [selectedList, setSelectedList] = useState<number | undefined>();

  useEffect(() => {
    const fetchLists = async () => {
      await getData('https://localhost:7058/TodoList')
        .then((data) => {
          const responseLists: TodoListModel[] = data.$values.map((todoListvalues: any) => {
            const todoList: TodoListModel = {
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

  const onListSelect: (newValue: SingleValue<TodoListModel>, actionMeta: ActionMeta<TodoListModel>) => void = (e) => {
    setSelectedList(e?.value);
  };

  if (error) {
    return <p>Failed to fetch lists</p>;
  }

  return (
    <div>
      <div className="P-3 flex flex-row items-center max-w-full mb-10">
        <p className="min-w-fit mr-5">Select todo list:</p>
        <Select options={lists} onChange={onListSelect} className="w-64 min-w-fit" />
      </div>
      {selectedList && <TodoList listId={selectedList} />}
      {!selectedList && <p>Pick list to see todos</p>}
    </div>
  );
};

export default ListSelector;
