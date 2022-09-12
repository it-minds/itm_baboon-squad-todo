namespace todo_backend.DTO.Responses
{
    public class SubtaskResponseDto
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        public int SubtaskId { get; set; }
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
        public bool Checked { get; set; }
        public int Position { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
    }
}
