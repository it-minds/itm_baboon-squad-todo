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
            if (newPosition >= 0 && newPosition < subtask.Todo.Subtasks.Count)
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
            if (newPosition < 0 || newPosition >= subtask.Todo.Subtasks.Count) return subtask;

            subtask.Todo.Subtasks
                            .FirstOrDefault(s => s.Position == newPosition)!
                            .Position = subtask.Position;
            subtask.Position = newPosition;


            var i = 0;
            subtask.Todo.Subtasks
                .OrderBy(t => t.Position)
                .ToList()
                .ForEach(s => s.Position = i++);
            return subtask;

        }

        public Todo ArrangePositionAfterDelete(Todo todo, Subtask subtask)
        {
            foreach (var item in todo.Subtasks)
            {
                if (item.Position > subtask.Position)
                {
                    item.Position--;
                }
            }
            return todo;
        }
    }
}
