using todo_backend.Classes;
using todo_backend.DataBase;
using todo_backend.Logic;
using todo_backend.Interfaces;
using todo_backend.DTO;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace todo_backend.Repositories
{
    public class TodoRepository
    {
        private TodoDBContext _dbContext;
        ITodoArranger todoArranger;

        public TodoRepository(TodoDBContext todoDBContext)
        {
            _dbContext = todoDBContext;
            todoArranger = new TodoArranger();

        }
        public List<Todo> GetTodosInList(int todoListId)
        {
            return _dbContext.Todos
                .Where(t=>t.TodoListId==todoListId)
                .ToList<Todo>();
        }
        public Todo? GetTodo(int id)
        {
            return _dbContext.Todos.Include(t => t.Subtasks).FirstOrDefault(t => t.TodoId == id);
        }
        public Todo CreateTodo(string title, int position,TodoList todoList,DateTime deadline)
        {
            Todo t = new Todo();
            t.Subtasks = new();
            t.Title = title;
            t.Checked = false;
            t.TodoListId = todoList.TodoListId;
            t.Deadline = deadline;
            t.TodoList = todoArranger.ArrangePosition(todoList, position, t);

            todoList.Todos.Add(t);
            _dbContext.Todos.Add(t);

            _dbContext.SaveChanges();
            return t;
        }
        public Todo DeleteTodo(Todo todo)
        {
            var t = _dbContext.Todos.Find(todo.TodoId);
            if (t != null)
            {
                t.TodoList = todoArranger.ArrangePositionAfterDelete(t.TodoList, t);
                _dbContext.Todos.Remove(t);
                _dbContext.SaveChanges();
            }
            return t;
        }
        public Todo UpdateTodo(UpdateTodoDTO updateTodoDTO, TodoList todoList)
        {
            var t = _dbContext.Todos.Find(updateTodoDTO.TodoId);
            if (t != null)
            {
                t.Title =updateTodoDTO.Title;
                t.TodoList = todoArranger.ArrangePosition(t.TodoList,updateTodoDTO.Position,t);
                t.Checked = updateTodoDTO.Checked;
                t.Deadline= updateTodoDTO.Deadline;
                _dbContext.SaveChanges();
            }
            return t;
        }
      
    }
}

