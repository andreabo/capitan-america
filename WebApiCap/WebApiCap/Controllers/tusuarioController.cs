using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiCap.Models;

namespace WebApiCap.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class tusuarioController : ControllerBase
    {
        public readonly ApplicationDbContext Context;

        public tusuarioController(ApplicationDbContext context)
        {
            this.Context = context;
        }
        [HttpGet("{id}")]
        public IEnumerable<RegistroUsersCap> Get(string id)
        {
            return Context.RegistroUsersCap.Where(x => x.Tpersona == id).ToList();
        }

        [HttpPost]
        public IActionResult Create([FromBody]tUsuario tuser)
        {
            if (ModelState.IsValid)
            {
                Context.tUsuario.Add(tuser);
                Context.SaveChanges();

                return Ok();
            }
            return BadRequest(ModelState);
        }
    }
}