﻿namespace todo_backend.DTO
{
    public class CreateTodoDTO
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
        public int TodoListId { get; set; }
        public int Position { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    }
}
