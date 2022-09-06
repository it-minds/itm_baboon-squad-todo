using todo_backend.Classes;
using todo_backend.Repositories;
using todo_backend.Interfaces;

namespace todo_backend.Logic
{
    public class SubtaskArranger: ISubtaskArranger
    {
        public Todo ArrangePosition(Todo todo, int newPosition)
        {
            int max = new();
            foreach (var item in todo.Subtasks)
            {
                if (max <= item.Position)
                {
                    max = item.Position;
                }
            }
            if (max + 1 < newPosition)
            {
                newPosition = max + 1;
            }
            foreach (var item in todo.Subtasks)
            {
                if (item.Position >= newPosition)
                {
                    item.Position++;
                }
            }
            return todo;
        }
    }
}
