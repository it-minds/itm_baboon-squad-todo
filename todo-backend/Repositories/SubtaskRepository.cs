using todo_backend.Repositories;
using todo_backend.Classes;
using todo_backend.DataBase;
using System.Linq;

namespace todo_backend.Repositories
{
    public class SubtaskRepository
    {

        private TodoDBContext _dbContext;
        public SubtaskRepository(TodoDBContext todoDBContext)
        {
            _dbContext = todoDBContext;
        }
        public List<Subtask> GetSubtaskInTodo(int todoId)
        {
            return _dbContext.Subtasks
                .Where(t => t.TodoId == todoId)
                .ToList<Subtask>();
        }
        public Subtask? GetSubtask(int id)
        {
            return _dbContext.Subtasks.Find(id) as Subtask;
        }
        public Subtask CreateSubtask(string title, int position, Todo todo, DateTime deadline)
        {
            Subtask t = new Subtask();
            t.Title = title;
            t.Position = position;
            t.Todo = todo;
            t.Checked = false;
            t.TodoId = t.Todo.TodoId;
            t.Deadline = deadline;
            todo.Subtasks.Add(t);
            _dbContext.Subtasks.Add(t);
            _dbContext.SaveChanges();
            return t;
        }
        public Subtask DeleteSubtask(int id)
        {
            var t = _dbContext.Subtasks.Find(id);
            if (t != null)
            {
                _dbContext.Subtasks.Remove(t);
                _dbContext.SaveChanges();
            }
            return t;
        }
        public Subtask UpdateSubtaskTitle(int id, string newTitle)
        {
            var t = _dbContext.Subtasks.Find(id);
            if (t != null)
            {
                t.Title = newTitle;
                _dbContext.SaveChanges();
            }
            return t;
        }
        public Subtask UpdateSubtaskDeadline(int id, DateTime newDeadline)
        {
            var t = _dbContext.Subtasks.Find(id);
            if (t != null)
            {
                t.Deadline = newDeadline;
                _dbContext.SaveChanges();
            }
            return t;
        }
        public Subtask UpdateSubtaskIsChecked(int id, bool isChecked)
        {
            var t = _dbContext.Subtasks.Find(id);
            if (t != null)
            {
                t.Checked = isChecked;
                _dbContext.SaveChanges();
            }
            return t;
        }
        public Subtask UpdateSubtaskPosition(int id, int position)
        {
            var t = _dbContext.Subtasks.Find(id);
            if (t != null)
            {
                t.Position = position;
                _dbContext.SaveChanges();
            }
            return t;
        }
    }
}