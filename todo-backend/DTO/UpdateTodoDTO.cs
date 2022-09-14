using todo_backend.Classes;

namespace todo_backend.DTO
{
    public class UpdateTodoDTO
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public int TodoId { get; set; }
        public string Title { get; set; }
        public int TodoListId { get; set; }
        public DateTime Deadline { get; set; }
        public bool Checked { get; set; }
        public int Position { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    }
}

