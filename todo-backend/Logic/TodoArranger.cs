using todo_backend.Classes;
using todo_backend.Interfaces;

namespace todo_backend.Logic
{
    public class TodoArranger: ITodoArranger
    {
        public TodoList ArrangePosition(TodoList todoList, int newPosition, Todo todo)
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
                todo.Position = max + 1;
              
            }
            else
            {
                foreach (var item in todoList.Todos)
                {
                    if (item.Position >= newPosition)
                    {
                        item.Position++;
                    }
                }
                todo.Position = newPosition;
            }
           
            return todoList;
        }

        public TodoList ArrangePositionAfterDelete(TodoList todoList, Todo todo)
        {
            foreach (var item in todoList.Todos)
            {
                if(item.Position>todo.Position)
                {
                    item.Position--;
                }
            }
            return todoList;
        }
    }
}
