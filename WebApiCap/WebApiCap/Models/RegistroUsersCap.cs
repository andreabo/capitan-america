using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiCap.Models
{
    public class RegistroUsersCap
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [ForeignKey("tUsuario")]
        public int Tpersona { get; set; }
        public tUsuario tUsuario { get; set; }
    }
}
