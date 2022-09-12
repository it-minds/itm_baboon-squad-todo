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
            return _dbContext.Subtasks.FirstOrDefault(t => t.SubtaskId == id);
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
        public Subtask? DeleteSubtask(Subtask delete)
        {
            var s = _dbContext.Subtasks
                .Include(s => s.Todo)
                .ThenInclude(s => s.Subtasks)
                .FirstOrDefault(s => s.SubtaskId == delete.SubtaskId);
            if (s != null)
            {
                s.Todo.Subtasks.Remove(s);
                //s = subtaskArranger.ArrangePositionOnDelete(s);
                //_dbContext.Subtasks.Remove(s);
                _dbContext.SaveChanges();
            }
            return s;
        }
        public Subtask? UpdateSubtask(UpdateSubtaskDTO updateSubtaskDTO)
        {
            var subtask = _dbContext.Subtasks
                .Include(s => s.Todo)
                .ThenInclude(t => t.Subtasks)
                .FirstOrDefault(s => s.SubtaskId == updateSubtaskDTO.SubTaskId);
            if (subtask != null)
            {
                if (updateSubtaskDTO.Position != subtask.Position)
                {
                    subtask = subtaskArranger.ArrangePositionOnUpdate(updateSubtaskDTO.Position, subtask);
                }
                subtask.Title = updateSubtaskDTO.Title;
                subtask.Checked = updateSubtaskDTO.Checked;
                subtask.Deadline = updateSubtaskDTO.Deadline;

                _dbContext.SaveChanges();
            }
            return subtask;
        }
    }
}