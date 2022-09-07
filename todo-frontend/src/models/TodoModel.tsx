import { SubtaskModel } from "./SubtaskModel";

export type TodoModel = {
    TodoId: number;
    Title: string;
    Deadline?: string;
    Checked: boolean;
    position: number;
    subtasks?: SubtaskModel[];
    TodoListId: number
  };

