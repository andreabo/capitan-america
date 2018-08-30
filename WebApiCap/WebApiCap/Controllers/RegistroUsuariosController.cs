using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using WebApiCap.Models;

namespace WebApiCap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistroUsuariosController : ControllerBase
    {
        public readonly ApplicationDbContext Context;
        public RegistroUsuariosController(ApplicationDbContext context)
        {
            this.Context = context;
        }

        [HttpGet]
        public IEnumerable<RegistroUsersCap> Get()
        {
            return Context.RegistroUsersCap.ToList();
        }

        [HttpGet("{id}", Name = "UsuarioCreado")]
        public IActionResult GetById(int Id)
        {
            var Usuario = Context.RegistroUsersCap.FirstOrDefault(x => x.Id == Id);
            if (Usuario == null)
            {
                return NotFound();
            }

            return Ok(Usuario);
        }

        [HttpPost]
        public IActionResult Create([FromBody]RegistroUsersCap User)
        {
            if (ModelState.IsValid)
            {
                Context.RegistroUsersCap.Add(User);
                Context.SaveChanges();

                return new CreatedAtRouteResult("UsuarioCreado", new { id = User.Id }, User);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody]RegistroUsersCap User, int Id)
        {
            if (ModelState.IsValid && User.Id == Id)
            {
                Context.Entry(User).State = EntityState.Modified;
                Context.SaveChanges();

                return new CreatedAtRouteResult("UsuarioCreado", new { id = User.Id }, User);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int Id)
        {
            var user = Context.RegistroUsersCap.FirstOrDefault(x => x.Id == Id);
            if (user == null)
            {
                return NotFound();
            }

            Context.RegistroUsersCap.Remove(user);
            Context.SaveChanges();

            return Ok(user);
        }
    }
}