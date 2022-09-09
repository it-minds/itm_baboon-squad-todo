namespace todo_backend.DTO
{
    public class CreateTodoDTO
    {
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
        public int TodoListId { get; set; }
        public int Position { get; set; }
    }
}
