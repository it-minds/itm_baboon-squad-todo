using Microsoft.VisualBasic;
using System.Collections.ObjectModel;

namespace todo_backend.Classes
{
    public class TodoList
    {
        public int TodoListId { get; set; }
        public string Title { get; set; }
        public List<Todo> Todos { get; set; }
    }
}
