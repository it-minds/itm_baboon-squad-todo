using todo_backend.Classes;
using todo_backend.DataBase;
using System.Linq;

namespace todo_backend.Repositories
{
    public class TodoRepository
    {
        private TodoDBContext _dbContext;
        public TodoRepository(TodoDBContext todoDBContext)
        {
            _dbContext = todoDBContext;
        }
        public List<Todo> GetTodosInList(int todoListId)
        {
            return _dbContext.Todos
                .Where(t=>t.TodoListId==todoListId)
                .ToList<Todo>();
        }
        public Todo? GetTodo(int id)
        {
            return _dbContext.Todos.Find(id) as Todo;
        }
        public Todo CreateTodo(string title, int position,TodoList todoList,DateTime deadline)
        {
            Todo t = new Todo();
            t.Subtasks = new();
            t.Title = title;
            t.Position = position;
            t.ToDoList = todoList;
            t.Checked = false;
            t.TodoListId = t.ToDoList.ToDoListId;
            t.Deadline = deadline;
            todoList.Todos.Add(t);
            _dbContext.Todos.Add(t);
            _dbContext.SaveChanges();
            return t;
        }
        public Todo DeleteTodo(int id)
        {
            var t = _dbContext.Todos.Find(id);
            if (t != null)
            {
                _dbContext.Todos.Remove(t);
                _dbContext.SaveChanges();
            }
            return t;
        }
        public Todo UpdateTodoTitle(int id, string newTitle)
        {
            var t = _dbContext.Todos.Find(id);
            if (t != null)
            {
                t.Title = newTitle;
                _dbContext.SaveChanges();
            }
            return t;
        }
        public Todo UpdateTodoDeadline(int id, DateTime newDeadline)
        {
            var t = _dbContext.Todos.Find(id);
            if (t != null)
            {
                t.Deadline=newDeadline;
                _dbContext.SaveChanges();
            }
            return t;
        }
        public Todo UpdateTodoIsChecked(int id, bool isChecked)
        {
            var t = _dbContext.Todos.Find(id);
            if (t != null)
            {
                t.Checked=isChecked;
                _dbContext.SaveChanges();
            }
            return t;
        }
        public Todo UpdateTodoPosition(int id, int position)
        {
            var t = _dbContext.Todos.Find(id);
            if (t != null)
            {
                t.Position=position;
                _dbContext.SaveChanges();
            }
            return t;
        }
    }
}

