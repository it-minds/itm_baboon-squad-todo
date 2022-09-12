namespace todo_backend.Classes
{
    public class Subtask
    {
        public int SubtaskId { get; set; }
        public string Title { get; set; }
        public DateTime Deadline { get;set; }
        public bool Checked { get; set; }
        public int Position { get; set; }
        
        public int TodoId { get; set; }
        public Todo Todo { get; set; }
    }
}
