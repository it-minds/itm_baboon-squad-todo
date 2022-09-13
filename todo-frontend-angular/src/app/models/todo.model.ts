import { Subtask } from './subtask.model'

export interface Todo {
    todoId: number;
    title: string;
    deadline?: string;
    checked: boolean;
    position: number;
    subtasks?: Subtask[];
    todoListId: number;
  };