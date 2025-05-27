using Microsoft.EntityFrameworkCore;
using PersonApi.Data;
using PersonApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddDbContext<PersonContext>(options =>
    options.UseSqlite("Data Source=persons.db"));

// Добавляем Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<PersonContext>();
    dbContext.Database.EnsureCreated();

    // Добавление тестовых данных
    if (!dbContext.Persons.Any())
    {
        dbContext.Persons.AddRange(
            new Person { Name = "Alice Smith", Age = 25, Occupation = "Designer" },
            new Person { Name = "Bob Johnson", Age = 30, Occupation = "Engineer" },
            new Person { Name = "Carol Williams", Age = 28, Occupation = "Teacher" }
        );
        dbContext.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();