using todo_backend.Repositories;
using todo_backend.Classes;
using todo_backend.DataBase;
using todo_backend.DTO;
using todo_backend.Logic;
using System.Linq;
using todo_backend.Interfaces;

namespace todo_backend.Repositories
{
    public class SubtaskRepository
    {

        private TodoDBContext _dbContext;
        private ISubtaskArranger subtaskArranger;

        public SubtaskRepository(TodoDBContext todoDBContext)
        {
            _dbContext = todoDBContext;
            subtaskArranger = new SubtaskArranger();
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
        public Subtask CreateSubtask(CreateSubtaskDTO createSubtaskDTO, Todo todo)
        {
            Subtask t = new Subtask();
            t.Title = createSubtaskDTO.Title;
            t.Todo = subtaskArranger.ArrangePosition(todo, createSubtaskDTO.Position);
            t.Checked = createSubtaskDTO.Checked;
            t.TodoId = t.Todo.TodoId;
            t.Deadline = createSubtaskDTO.Deadline;
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
        public Subtask UpdateSubtask(UpdateSubtaskDTO updateSubtaskDTO)
        {
            var t = _dbContext.Subtasks.Find(updateSubtaskDTO.SubTaskId);
            if (t != null)
            {
                t.Title = updateSubtaskDTO.Title;
                t.Todo = subtaskArranger.ArrangePosition(t.Todo, updateSubtaskDTO.Position);
                t.Checked=updateSubtaskDTO.Checked;
                t.Deadline=updateSubtaskDTO.Deadline;
                _dbContext.SaveChanges();
            }
            return t;
        }
    }
}