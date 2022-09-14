using System.Collections.ObjectModel;

namespace todo_backend.Classes
{
    public class Todo
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        public int TodoId { get; set; }
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
        public bool Checked { get; set; }
        public int Position { get; set; }
        public List<Subtask> Subtasks { get; set; }

        public int TodoListId { get; set; }
        public TodoList TodoList { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    }
}
