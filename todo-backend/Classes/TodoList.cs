namespace todo_backend.Classes
{
    public class TodoList
    {
        public int ToDoListId { get; set; }
        public string Title { get; set; }
        public List<Todo> Todos { get; set; }
    }
}
