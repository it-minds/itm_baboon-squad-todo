using Microsoft.EntityFrameworkCore;
using todo_backend.DataBase;
using todo_backend.DTO;
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

app.MapPut("/Todo/{id}", (TodoRepository todoRepository, UpdateTodoDTO updateTodoDTO) =>
{
    var result = todoRepository.UpdateTodo(updateTodoDTO);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateTodo");


//Subtasks

app.MapPost("/Subtask", (SubtaskRepository subtaskRepository, TodoRepository todoRepository,CreateSubtaskDTO createSubtaskDTO) =>
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
    return result != null ? Results.Ok(result) : Results.NotFound();
})
.WithName("GetSubtask");

app.MapDelete("/Subtask/{id}", (SubtaskRepository subtaskRepository, int id) =>
{
    var result = subtaskRepository.DeleteSubtask(id);
    return result != null ? Results.Ok(result) : Results.NotFound();
})
.WithName("DeleteSubtask");

app.MapPut("/Subtask/{id}", (SubtaskRepository subtaskRepository, UpdateSubtaskDTO updateSubtaskDTO) =>
{
    var result = subtaskRepository.UpdateSubtask(updateSubtaskDTO);
    return result != null ? Results.NoContent() : Results.NotFound();
})
.WithName("UpdateSubtask");


app.Run();

