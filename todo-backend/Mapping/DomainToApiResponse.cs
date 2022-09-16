using todo_backend.Classes;
using todo_backend.DTO.Responses;

namespace todo_backend.Mapping;

public static class DomainToApiResponse
{
    public static TodolistResponseDto ToTodolistResponseDto(this TodoList t) => new TodolistResponseDto()
    {
        TodoListId = t.TodoListId,
        Title = t.Title,
        Todos = t.Todos.Select(t => t.ToTodoResponseDto()).ToList()
    };


    public static TodoResponseDto ToTodoResponseDto(this Todo t) => new TodoResponseDto
    {
        TodoId = t.TodoId,
        Title = t.Title,
        Deadline = t.Deadline,
        Checked = t.Checked,
        Position = t.Position,
        Subtasks = t.Subtasks.Select(s =>  s.ToSubtaskResponseDto()).ToList(),
        TodoListId= t.TodoListId
    };

    public static SubtaskResponseDto ToSubtaskResponseDto(this Subtask s) => new SubtaskResponseDto
    {
        SubtaskId = s.SubtaskId,
        Title = s.Title,
        Deadline = s.Deadline,
        Checked = s.Checked,
        Position = s.Position,
    };
}
