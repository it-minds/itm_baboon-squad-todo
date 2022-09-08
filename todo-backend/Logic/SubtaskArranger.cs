using todo_backend.Classes;
using todo_backend.Repositories;
using todo_backend.Interfaces;
using System.Linq;

namespace todo_backend.Logic
{
    public class SubtaskArranger : ISubtaskArranger
    {
        public Subtask ArrangePositionOnCreate(int newPosition, Subtask subtask)
        {
            if (newPosition >= 0 && newPosition <= subtask.Todo.Subtasks.Max(s => s.Position))
            {
                subtask.Todo.Subtasks
                    .Where(s => s.Position >= newPosition)
                    .ToList()
                    .ForEach(s => ++s.Position);
            }

            subtask.Position = newPosition;

            var i = 0;
            subtask.Todo.Subtasks
                .OrderBy(t => t.Position)
                .ToList()
                .ForEach(s => s.Position = i++);

            return subtask;
        }
        public Subtask ArrangePositionOnUpdate(int newPosition, Subtask subtask)
        {
            if (newPosition < 0) return subtask;

            if (newPosition < subtask.Position)
            {
                subtask.Todo.Subtasks
                            .Where(s => s.Position <= newPosition)
                            .MaxBy(t => t.Position)!.Position = subtask.Position;
            }
            else
            {
                subtask.Todo.Subtasks
                            .Where(s => s.Position >= newPosition)
                            .MinBy(t => t.Position)!.Position = subtask.Position;

            }
            subtask.Position = newPosition;

            return subtask;

        }

        public Subtask ArrangePositionOnDelete(Subtask subtask)
        {
            var i = 0;
            subtask.Todo.Subtasks
                .OrderBy(t => t.Position)
                .ToList()
                .ForEach(s => s.Position = i++);
            return subtask;
        }
    }
}
