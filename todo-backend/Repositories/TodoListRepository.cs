﻿using todo_backend.DataBase;
using todo_backend.Classes;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using todo_backend.DTO.Responses;

namespace todo_backend.Repositories
{
    public class TodoListRepository
    {
        private readonly TodoDBContext _dbContext;
        public TodoListRepository(TodoDBContext todoDBContext)
        {
            _dbContext = todoDBContext;
        }
        public List<TodoList> GetTodoLists()
        {
            return _dbContext.TodoLists.ToList<TodoList>();
        }
        public TodoList? GetTodoListWithId(int id)
        {
            return _dbContext.TodoLists
                .Include(t => t.Todos)
                .ThenInclude(t => t.Subtasks)
                .FirstOrDefault(t => t.TodoListId == id);
        }

        public TodoList CreateTodoList(string title)
        {
            TodoList t = new TodoList();
            t.Todos = new List<Todo>();
            t.Title = title;
            _dbContext.TodoLists.Add(t);
            _dbContext.SaveChanges();
            return t;
        }
        public TodoList? DeleteTodoList(int id)
        {
            var t = _dbContext.TodoLists.Include(t => t.Todos).FirstOrDefault<TodoList>(t => t.TodoListId == id);
            if (t != null)
            {
                _dbContext.TodoLists.Remove(t);
                _dbContext.SaveChanges();
            }
            return t;
        }
        public TodoList? UpdateTodoList(int id, string newTitle)
        {
            var t = _dbContext.TodoLists.Find(id);
            if (t != null)
            {
                t.Title = newTitle;
                _dbContext.SaveChanges();
            }
            return t;
        }
    }
}
