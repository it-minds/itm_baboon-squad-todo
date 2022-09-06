using todo_backend.Classes;

namespace todo_backend.Interfaces
{
    public interface ITodoArranger
    {
        TodoList ArrangePosition(TodoList todoList, int newPosition,Todo todo);
        TodoList ArrangePositionAfterDelete(TodoList todoList, Todo todo);
    }
}
