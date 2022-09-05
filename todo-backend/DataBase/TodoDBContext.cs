using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using todo_backend.Classes;

namespace todo_backend.DataBase
{
    public class TodoDBContext: DbContext
    {
        public DbSet<TodoList> TodoLists { get; set; }
        public DbSet<Todo> Todos { get; set; }
        public DbSet<Subtask> Subtasks { get; set; }
        public TodoDBContext(DbContextOptions<TodoDBContext> options) : base(options)
        {

        }
        public TodoDBContext()
        {

        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoList>().HasMany(t => t.Todos).WithOne(t=> t.ToDoList);
            modelBuilder.Entity<Todo>().HasMany(t => t.Subtasks).WithOne(t => t.Todo);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=Baboon;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }
    }
}
