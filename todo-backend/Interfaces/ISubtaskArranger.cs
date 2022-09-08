using todo_backend.Classes;

namespace todo_backend.Interfaces
{
    public interface ISubtaskArranger
    {
        Subtask ArrangePositionOnCreate(int newPosition, Subtask subtask);
        Subtask ArrangePositionOnUpdate(int newPosition, Subtask subtask);
        Subtask ArrangePositionOnDelete(Subtask subtask);
    }
}
