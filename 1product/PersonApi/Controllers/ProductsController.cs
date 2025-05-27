using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PersonApi.Data;
using PersonApi.Models;

namespace PersonApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PersonsController : ControllerBase
{
    private readonly PersonContext _context;

    public PersonsController(PersonContext context)
    {
        _context = context;
    }

    // GET: api/persons
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Person>>> GetPersons()
    {
        return await _context.Persons.ToListAsync();
    }

    // POST: api/persons
    [HttpPost]
    public async Task<ActionResult<Person>> CreatePerson(Person person)
    {
        _context.Persons.Add(person);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPersons), new { id = person.Id }, person);
    }
}