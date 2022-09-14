using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using todo_backend.Classes;

namespace todo_backend.DataBase
{
    public class TodoDBContext : DbContext
    {
        public DbSet<TodoList> TodoLists { get; set; }
        public DbSet<Todo> Todos { get; set; }
        public DbSet<Subtask> Subtasks { get; set; }
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public TodoDBContext(DbContextOptions<TodoDBContext> options) : base(options) { }
        public TodoDBContext() { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoList>()
                .HasMany(t => t.Todos)
                .WithOne(t => t.TodoList)
                .HasForeignKey(t => t.TodoListId);

            modelBuilder.Entity<Todo>()
                .HasMany(t => t.Subtasks)
                .WithOne(t => t.Todo)
                .HasForeignKey(t => t.TodoId);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Baboon;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }
    }
}
