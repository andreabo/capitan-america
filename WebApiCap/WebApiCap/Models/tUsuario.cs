using System.ComponentModel.DataAnnotations;

namespace WebApiCap.Models
{
    public class tUsuario
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
