using todo_backend.Classes;

namespace todo_backend.Interfaces
{
    public interface ITodoArranger
    {
        TodoList ArrangePosition(TodoList todo, int newPosition);
    }
}
