using Microsoft.EntityFrameworkCore;
using todo_backend.DataBase;
using todo_backend.Classes;
using todo_backend.Repositories;
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDBContext>();
builder.Services.AddScoped<TodoListRepository>();
builder.Services.AddScoped<TodoRepository>();
builder.Services.AddScoped<SubtaskRepository>();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<JsonOptions>(options => { options.SerializerOptions.ReferenceHandler=System.Text.Json.Serialization.ReferenceHandler.Preserve; });
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapPost("/TodoList", (TodoListRepository todoListRepository,string title) =>
{
    var result =todoListRepository!.CreateTodoList(title);
    return Results.Created("Item with title: "+ title + " was created", result);
})
.WithName("CreateTodoList");

app.MapGet("/TodoList", (TodoListRepository todoListRepository) =>
{
    var result = todoListRepository!.GetTodoLists();
    return result != null ? Results.Ok(result) : Results.NotFound();
})
.WithName("GetAllTodoLists");

app.MapDelete("/TodoList/{id}", (TodoListRepository todoListRepository, int id) =>
{
    var result = todoListRepository.DeleteTodoList(id);
    return result!=null?Results.Ok(result): Results.NotFound();
})
.WithName("DeleteTodoList");

app.MapPut("/TodoList/{id}", (TodoListRepository todoListRepository, int id, string newTitle) =>
{
    var result = todoListRepository.UpdateTodoList(id, newTitle);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateTitleOfTodoList");

//Todos

app.MapPost("/Todo", (TodoRepository todoRepository,TodoListRepository todoListRepository, string title, int position, int todoListId, DateTime deadline) =>
{
    var todoList = todoListRepository.GetTodoListWithId(todoListId);
    if(todoList==null)
    {
        return Results.NotFound();
    }
    var result = todoRepository!.CreateTodo(title,position,todoList,deadline);
    return Results.Created("Item with title: " + title + " was created", result);
})
.WithName("CreateTodo");

app.MapGet("/Todo/{id}", (TodoRepository todoRepository, int id) =>
{
    var result = todoRepository!.GetTodo(id);
    return result != null ? Results.Ok(result) : Results.NotFound();
})
.WithName("GetTodo");

app.MapDelete("/Todo/{id}", (TodoRepository todoRepository, int id) =>
{
    var result = todoRepository.DeleteTodo(id);
    return result != null ? Results.Ok(result) : Results.NotFound();
})
.WithName("DeleteList");

app.MapPut("/Todo/{id}", (TodoRepository todoRepository, int id, string newTitle) =>
{
    var result = todoRepository.UpdateTodoTitle(id, newTitle);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateTitleOfTodo");

app.MapPut("/Todo/{newDeadline}", (TodoRepository todoRepository, int id, DateTime newDeadline) =>
{
    var result = todoRepository.UpdateTodoDeadline(id, newDeadline);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateDeadlineOfTodo");

app.MapPut("/Todo/{isChecked}", (TodoRepository todoRepository, int id, bool isChecked) =>
{
    var result = todoRepository.UpdateTodoIsChecked(id, isChecked);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateisCheckedOfTodo");

app.MapPut("/Todo/{position}", (TodoRepository todoRepository, int id, int position) =>
{
    var result = todoRepository.UpdateTodoPosition(id, position);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdatePositionOfTodo");

//Subtasks

app.MapPost("/Subtask", (SubtaskRepository subtaskRepository, TodoRepository todoRepository, string title, int position, int todoId, DateTime deadline) =>
{
    var todo = todoRepository.GetTodo(todoId);
    if (todo == null)
    {
        return Results.NotFound();
    }
    var result = subtaskRepository!.CreateSubtask(title, position, todo, deadline);
    return Results.Created("Item with title: " + title + " was created", result);
})
.WithName("CreateSubtask");

app.MapGet("/Subtask/{id}", (SubtaskRepository subtaskRepository, int id) =>
{
    var result = subtaskRepository!.GetSubtask(id);
    return result != null ? Results.Ok(result) : Results.NotFound();
})
.WithName("GetSubtask");

app.MapDelete("/Subtask/{id}", (SubtaskRepository subtaskRepository, int id) =>
{
    var result = subtaskRepository.DeleteSubtask(id);
    return result != null ? Results.Ok(result) : Results.NotFound();
})
.WithName("DeleteSubtask");

app.MapPut("/Subtask/{id}", (SubtaskRepository subtaskRepository, int id, string newTitle) =>
{
    var result = subtaskRepository.UpdateSubtaskTitle(id, newTitle);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateTitleOfSubtask");

app.MapPut("/Subtask/{newDeadline}", (SubtaskRepository subtaskRepository, int id, DateTime newDeadline) =>
{
    var result = subtaskRepository.UpdateSubtaskDeadline(id, newDeadline);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateDeadlineOfSubtask");

app.MapPut("/Subtask/{isChecked}", (SubtaskRepository subtaskRepository, int id, bool isChecked) =>
{
    var result = subtaskRepository.UpdateSubtaskIsChecked(id, isChecked);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateisCheckedOfSubtask");

app.MapPut("/Subtasl/{position}", (SubtaskRepository subtaskRepository, int id, int position) =>
{
    var result = subtaskRepository.UpdateSubtaskPosition(id, position);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdatePositionOfSubtask");

app.Run();

