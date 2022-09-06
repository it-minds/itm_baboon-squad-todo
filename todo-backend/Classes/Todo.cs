﻿namespace todo_backend.Classes
{
    public class Todo
    {
        public int TodoId { get; set; }
        public int TodoListId { get; set; }
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
        public bool Checked { get; set; }
        public int Position { get; set; }
        public TodoList ToDoList { get; set; }
        public List<Subtask> Subtasks { get; set; }
    }
}