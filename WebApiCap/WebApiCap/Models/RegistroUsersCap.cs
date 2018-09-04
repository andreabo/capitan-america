﻿using System.ComponentModel.DataAnnotations;

namespace WebApiCap.Models
{
    public class RegistroUsersCap
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Tpersona { get; set; }
    }
}
