using todo_backend.Classes;

namespace todo_backend.DTO.Responses
{
    public class TodolistResponseDto
    {
        public int TodoListId { get; set; }
        public string Title { get; set; }

        public List<TodoResponseDto> Todos { get; set; }
    }
}
