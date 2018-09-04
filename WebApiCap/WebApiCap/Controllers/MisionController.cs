using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiCap.Models;

namespace WebApiCap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowMyOrigin")]
    public class MisionController : ControllerBase
    {
        public readonly ApplicationDbContext Context;
        public MisionController(ApplicationDbContext context)
        {
            this.Context = context;
        }

        [HttpGet]
        public IEnumerable<Mision> Get()
        {
            return Context.Mision.ToList();
        }

        [HttpGet("{id}", Name = "MisionCreada")]
        public IActionResult GetById(int Id)
        {
            var mision = Context.Mision.FirstOrDefault(x => x.Id == Id);
            if (mision == null)
            {
                return NotFound();
            }

            return Ok(mision);
        }

        [HttpPost]
        public IActionResult Create([FromBody]Mision Mision)
        {
            if (ModelState.IsValid)
            {
                Context.Mision.Add(Mision);
                Context.SaveChanges();

                return new CreatedAtRouteResult("MisionCreada", new { id = Mision.Id }, Mision);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody]Mision Mision, int Id)
        {
            if (ModelState.IsValid && Mision.Id == Id)
            {
                Context.Entry(Mision).State = EntityState.Modified;
                Context.SaveChanges();

                return new CreatedAtRouteResult("MisionCreada", new { id = Mision.Id }, Mision);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int Id)
        {
            var mision = Context.Mision.FirstOrDefault(x => x.Id == Id);
            if (mision == null)
            {
                return NotFound();
            }

            Context.Mision.Remove(mision);
            Context.SaveChanges();

            return Ok(mision);
        }
    }
}