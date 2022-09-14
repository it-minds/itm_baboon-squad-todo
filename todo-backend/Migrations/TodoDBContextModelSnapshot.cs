﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using todo_backend.DataBase;

#nullable disable

namespace todo_backend.Migrations
{
    [DbContext(typeof(TodoDBContext))]
    partial class TodoDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("todo_backend.Classes.Subtask", b =>
                {
                    b.Property<int>("SubtaskId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SubtaskId"), 1L, 1);

                    b.Property<bool>("Checked")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime2");

                    b.Property<int>("Position")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TodoId")
                        .HasColumnType("int");

                    b.HasKey("SubtaskId");

                    b.HasIndex("TodoId");

                    b.ToTable("Subtasks");
                });

            modelBuilder.Entity("todo_backend.Classes.Todo", b =>
                {
                    b.Property<int>("TodoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TodoId"), 1L, 1);

                    b.Property<bool>("Checked")
                        .HasColumnType("bit");

                    b.Property<DateTime>("Deadline")
                        .HasColumnType("datetime2");

                    b.Property<int>("Position")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TodoListId")
                        .HasColumnType("int");

                    b.HasKey("TodoId");

                    b.HasIndex("TodoListId");

                    b.ToTable("Todos");
                });

            modelBuilder.Entity("todo_backend.Classes.TodoList", b =>
                {
                    b.Property<int>("TodoListId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TodoListId"), 1L, 1);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TodoListId");

                    b.ToTable("TodoLists");
                });

            modelBuilder.Entity("todo_backend.Classes.Subtask", b =>
                {
                    b.HasOne("todo_backend.Classes.Todo", "Todo")
                        .WithMany("Subtasks")
                        .HasForeignKey("TodoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Todo");
                });

            modelBuilder.Entity("todo_backend.Classes.Todo", b =>
                {
                    b.HasOne("todo_backend.Classes.TodoList", "TodoList")
                        .WithMany("Todos")
                        .HasForeignKey("TodoListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TodoList");
                });

            modelBuilder.Entity("todo_backend.Classes.Todo", b =>
                {
                    b.Navigation("Subtasks");
                });

            modelBuilder.Entity("todo_backend.Classes.TodoList", b =>
                {
                    b.Navigation("Todos");
                });
#pragma warning restore 612, 618
        }
    }
}
