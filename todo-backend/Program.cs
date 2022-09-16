using Microsoft.EntityFrameworkCore;
using todo_backend.DataBase;
using todo_backend.DTO;
using todo_backend.Classes;
using todo_backend.Repositories;
using todo_backend.Mapping;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDBContext>();
builder.Services.AddScoped<TodoListRepository>();
builder.Services.AddScoped<TodoRepository>();
builder.Services.AddScoped<SubtaskRepository>();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyPolicy",
                policy =>
                {
                    policy.WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:4200")
                                        .AllowAnyHeader()
                                        .AllowAnyMethod();
                });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("/TodoList", (TodoListRepository todoListRepository, string title) =>
{
    var result = todoListRepository!.CreateTodoList(title);
    return Results.Created("Item with title: " + title + " was created", result);
})
.WithName("CreateTodoList");

app.MapGet("/TodoList", (TodoListRepository todoListRepository) =>
{
    var result = todoListRepository!.GetTodoLists();
    return result != null ? Results.Ok(result) : Results.NotFound();
})
.WithName("GetAllTodoLists");

app.MapGet("/TodoList/{id}", (TodoListRepository todoListRepository, int id) =>
{
    TodoList? result = todoListRepository!.GetTodoListWithId(id);
    return result != null ? Results.Ok(result.ToTodolistResponseDto()) : Results.NotFound();
})
.WithName("GetOneTodoLists");

app.MapDelete("/TodoList/{id}", (TodoListRepository todoListRepository, int id) =>
{
    var result = todoListRepository.DeleteTodoList(id);
    return result != null ? Results.Ok(result.ToTodolistResponseDto()) : Results.NotFound();
})
.WithName("DeleteTodoList");

app.MapPut("/TodoList/{id}", (TodoListRepository todoListRepository, int id, string newTitle) =>
{
    var result = todoListRepository.UpdateTodoList(id, newTitle);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateTitleOfTodoList");

//Todos

app.MapPost("/Todo", (TodoRepository todoRepository, TodoListRepository todoListRepository, CreateTodoDTO todoDTO) =>
{
    var todoList = todoListRepository.GetTodoListWithId(todoDTO.TodoListId);
    if (todoList == null)
    {
        return Results.NotFound();
    }
    var result = todoRepository!.CreateTodo(todoDTO.Title, todoDTO.Position, todoList, todoDTO.Deadline);
    return Results.Created("Item with title: " + todoDTO.Title + " was created", result.ToTodoResponseDto());
})
.WithName("CreateTodo");

app.MapGet("/Todo/{id}", (TodoRepository todoRepository, int id) =>
{
    var result = todoRepository!.GetTodo(id);
    return result != null ? Results.Ok(result.ToTodoResponseDto()) : Results.NotFound();
})
.WithName("GetTodo");

app.MapDelete("/Todo/{id}", (TodoListRepository todoListRepository, TodoRepository todoRepository, int id) =>
{
    var todo = todoRepository.GetTodo(id);
    if (todo == null)
    {
        return Results.NotFound();
    }
    var todoList = todoListRepository.GetTodoListWithId(todo.TodoListId);
    if (todoList == null)
    {
        return Results.NotFound();
    }
    var result = todoRepository.DeleteTodo(todo);
    return result != null ? Results.Ok(result.ToTodoResponseDto()) : Results.NotFound();
})
.WithName("DeleteTodo");

app.MapPut("/Todo/", (TodoRepository todoRepository, TodoListRepository todoListRepository, UpdateTodoDTO updateTodoDTO) =>
{
    var todoList = todoListRepository.GetTodoListWithId(updateTodoDTO.TodoListId);
    if (todoList == null)
    {
        return Results.NotFound();
    }
    var result = todoRepository.UpdateTodo(updateTodoDTO);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateTodo");


//Subtasks

app.MapPost("/Subtask", (SubtaskRepository subtaskRepository, TodoRepository todoRepository, CreateSubtaskDTO createSubtaskDTO) =>
{
    var todo = todoRepository.GetTodo(createSubtaskDTO.TodoId);
    if (todo == null)
    {
        return Results.NotFound();
    }
    var result = subtaskRepository!.CreateSubtask(createSubtaskDTO, todo);
    return Results.Created("Item with title: " + createSubtaskDTO.Title + " was created", result);
})
.WithName("CreateSubtask");

app.MapGet("/Subtask/{id}", (SubtaskRepository subtaskRepository, int id) =>
{
    var result = subtaskRepository!.GetSubtask(id);
    return result != null ? Results.Ok(result.ToSubtaskResponseDto()) : Results.NotFound();
})
.WithName("GetSubtask");

app.MapDelete("/Subtask/{id}", (TodoRepository todoRepository, SubtaskRepository subtaskRepository, int id) =>
{
    var subtask = subtaskRepository!.GetSubtask(id);
    if (subtask == null)
    {
        return Results.NotFound();
    }
    var result = subtaskRepository.DeleteSubtask(subtask);
    return result != null ? Results.Ok(result.ToSubtaskResponseDto()) : Results.NotFound();
})
.WithName("DeleteSubtask");

app.MapPut("/Subtask", (SubtaskRepository subtaskRepository, UpdateSubtaskDTO updateSubtaskDTO) =>
{
    var result = subtaskRepository.UpdateSubtask(updateSubtaskDTO);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateSubtask");


app.UseCors("MyPolicy");
app.Run();

