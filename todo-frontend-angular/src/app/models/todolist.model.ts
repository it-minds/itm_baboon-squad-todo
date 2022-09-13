import { Todo } from './todo.model'

export interface Todolist {
    todolistId: number,
    title: string,
    todos: Todo[]
  };