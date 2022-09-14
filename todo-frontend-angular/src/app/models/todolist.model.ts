import { Todo } from './todo.model'

export interface Todolist {
    todoListId: number,
    title: string,
    todos: Todo[]
  };