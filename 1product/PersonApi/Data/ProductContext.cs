using Microsoft.EntityFrameworkCore;
using PersonApi.Models;

namespace PersonApi.Data;

public class PersonContext : DbContext
{
    public PersonContext(DbContextOptions<PersonContext> options) : base(options) { }
    public DbSet<Person> Persons { get; set; }
}