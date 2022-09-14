using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todo_backend.Migrations
{
    public partial class onetomanyrelationsupdatedpt3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SubTaskId",
                table: "Subtasks",
                newName: "SubtaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SubtaskId",
                table: "Subtasks",
                newName: "SubTaskId");
        }
    }
}
