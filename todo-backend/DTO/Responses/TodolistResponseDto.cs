using todo_backend.Classes;

namespace todo_backend.DTO.Responses
{
    public class TodolistResponseDto
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        public int TodoListId { get; set; }
        public string Title { get; set; }

        public List<TodoResponseDto> Todos { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    }
}
