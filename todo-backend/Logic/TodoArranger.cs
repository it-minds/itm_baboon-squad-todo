using todo_backend.Classes;
using todo_backend.Interfaces;

namespace todo_backend.Logic
{
    public class TodoArranger: ITodoArranger
    {
        public TodoList ArrangePosition(TodoList todoList, int newPosition)
        {
            int max = new();
            foreach (var item in todoList.Todos)
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
            foreach (var item in todoList.Todos)
            {
                if (item.Position >= newPosition)
                {
                    item.Position++;
                }
            }
            return todoList;
        }

    }
}
