namespace todo_backend.DTO.Responses
{
    public class SubtaskResponseDto
    {
        public int SubtaskId { get; set; }
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
        public bool Checked { get; set; }
        public int Position { get; set; }
    }
}
