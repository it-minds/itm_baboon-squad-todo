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
            Subtask s = new Subtask();
            s.Title = createSubtaskDTO.Title;
            s.Checked = false;
            s.TodoId = todo.TodoId;
            s.Todo = todo;
            s.Deadline = createSubtaskDTO.Deadline;
            //t.Todo = todo; // subtaskArranger.ArrangePosition(todo, createSubtaskDTO.Position, t);
            todo.Subtasks.Add(s);

            s = subtaskArranger.ArrangePositionOnCreate(createSubtaskDTO.Position, s);

            _dbContext.Subtasks.Add(s);
            _dbContext.SaveChanges();
            return s;
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
        public Subtask? UpdateSubtask(UpdateSubtaskDTO updateSubtaskDTO)
        {
            var subtask = _dbContext.Subtasks
                .Include(s => s.Todo)
                .ThenInclude(t=>t.Subtasks)
                .FirstOrDefault(s => s.SubTaskId == updateSubtaskDTO.SubTaskId);
            if (subtask != null)
            {
                subtask = subtaskArranger.ArrangePositionOnUpdate(updateSubtaskDTO.Position, subtask);

                subtask.Title = updateSubtaskDTO.Title;
                subtask.Checked = updateSubtaskDTO.Checked;
                subtask.Deadline = updateSubtaskDTO.Deadline;

                _dbContext.SaveChanges();
            }
            return subtask;
        }
    }
}