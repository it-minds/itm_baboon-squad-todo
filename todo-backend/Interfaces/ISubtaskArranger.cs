using todo_backend.Classes;

namespace todo_backend.Interfaces
{
    public interface ISubtaskArranger
    {
        Todo ArrangePosition(Todo todo, int newPosition, Subtask subtask);
        Todo ArrangePositionAfterDelete(Todo todo, Subtask subtask);
    }
}
