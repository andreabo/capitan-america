using System;
using System.ComponentModel.DataAnnotations;

namespace WebApiCap.Models
{
    public class Mision
    {
        public int Id { get; set; }
        [Required]
        public DateTime FechaHora { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
