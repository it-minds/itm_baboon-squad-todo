using todo_backend.Classes;
using todo_backend.Repositories;
using todo_backend.Interfaces;

namespace todo_backend.Logic
{
    public class SubtaskArranger: ISubtaskArranger
    {
        public Todo ArrangePosition(Todo todo, int newPosition, Subtask subtask)
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
                subtask.Position = max + 1;
               
            }
            else
            {
                foreach (var item in todo.Subtasks)
                {
                    if (item.Position >= newPosition)
                    {
                        item.Position++;
                    }
                }
                subtask.Position = newPosition;
            }
            

            return todo;
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
