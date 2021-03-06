﻿using Microsoft.EntityFrameworkCore;

namespace WebApiCap.Models
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }
        public DbSet<Mision> Mision { get; set; }
        public DbSet<RegistroUsersCap> RegistroUsersCap { get; set; }
        public DbSet<tUsuario> tUsuario { get; set; }
    }
}
