using todo_backend.Classes;
using todo_backend.Interfaces;
using todo_backend.Logic;

namespace todo_backend.test.unit;

public class Tests
{
    private readonly ITodoArranger _uut = new TodoArranger();
    [SetUp]

    public void Setup()
    {
    }

    [Test]
    public void ArrangePositionAfterDelete_No_Error()
    {
        // Arrange
        var todo1 = new Todo()
        {
            Position = 1
        };
        var todo2 = new Todo()
        {
            Position = 2
        };
        var todo3 = new Todo()
        {
            Position = 3
        };
        var todolist = new TodoList()
        {
            Todos = new List<Todo>() { todo1, todo2 }
        };

        // Act
        todolist = _uut.ArrangePositionAfterDelete(todolist, todo3);

        // Assert
        Assert.That(todolist.Todos[0].Position == 1);
    }

    [Test]
    public void Test1()
    {
        Assert.Pass();
    }
}