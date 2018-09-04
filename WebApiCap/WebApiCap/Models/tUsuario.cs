using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApiCap.Models
{
    public class tUsuario
    {

        public tUsuario()
        {
            Usuarios = new List<RegistroUsersCap>();
        }

        public int Id { get; set; }
        
        public string Name { get; set; }

        public List<RegistroUsersCap> Usuarios { get; set; }
    }
}
