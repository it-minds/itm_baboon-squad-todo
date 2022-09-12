using todo_backend.Classes;

namespace todo_backend.DTO.Responses
{
    public class TodoResponseDto
    {
        public int TodoId { get; set; }
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
        public bool Checked { get; set; }
        public int Position { get; set; }
        public List<SubtaskResponseDto> Subtasks { get; set; }
    }
}
