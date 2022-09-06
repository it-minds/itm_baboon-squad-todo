using todo_backend.Repositories;
using todo_backend.Classes;
using todo_backend.DataBase;
using todo_backend.DTO;
using todo_backend.Logic;
using System.Linq;
using todo_backend.Interfaces;
using Microsoft.EntityFrameworkCore;

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
            return _dbContext.Subtasks.FirstOrDefault(t => t.SubTaskId == id);
        }
        public Subtask CreateSubtask(CreateSubtaskDTO createSubtaskDTO, Todo todo)
        {
            Subtask t = new Subtask();
            t.Title = createSubtaskDTO.Title;
            t.Checked = createSubtaskDTO.Checked;
            t.TodoId = todo.TodoId;
            t.Deadline = createSubtaskDTO.Deadline;
            t.Todo = subtaskArranger.ArrangePosition(todo, createSubtaskDTO.Position, t);

            todo.Subtasks.Add(t);
            _dbContext.Subtasks.Add(t);
            _dbContext.SaveChanges();
            return t;
        }
        public Subtask DeleteSubtask(Subtask delete)
        {
            var t = _dbContext.Subtasks.Find(delete.SubTaskId);
            if (t != null)
            {
                t.Todo = subtaskArranger.ArrangePositionAfterDelete(t.Todo, t);
                _dbContext.Subtasks.Remove(t);
                _dbContext.SaveChanges();
            }
            return t;
        }
        public Subtask UpdateSubtask(UpdateSubtaskDTO updateSubtaskDTO)
        {
            var t = _dbContext.Subtasks.Find(updateSubtaskDTO.SubTaskId);
            Todo todo = _dbContext.Todos.Find(t.TodoId);
            t.Todo = todo;
            if (t != null)
            {
                t.Title = updateSubtaskDTO.Title;
                t.Todo = subtaskArranger.ArrangePosition(t.Todo, updateSubtaskDTO.Position,t);
                t.Checked=updateSubtaskDTO.Checked;
                t.Deadline=updateSubtaskDTO.Deadline;
                _dbContext.SaveChanges();
            }
            return t;
        }
    }
}