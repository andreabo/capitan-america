using Microsoft.EntityFrameworkCore;

namespace WebApiCap.Models
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }
        public DbSet<Mision> Mision { get; set; }
    }
}
