using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using WebApiCap.Models;

namespace WebApiCap
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseInMemoryDatabase("CapDB"));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ApplicationDbContext Context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();


            if (!Context.Mision.Any())
            {
                Context.Mision.AddRange(
                    new List<Mision>()
                    {
                        new Mision(){ FechaHora = Convert.ToDateTime("2025/08/06") , Name = "Levantar el martillo de Thor."},
                        new Mision(){ FechaHora = Convert.ToDateTime("2029/08/11") , Name = "Derrotar a Hydra."},
                        new Mision(){ FechaHora = DateTime.Now , Name = "Cumpleaños de Tony." }
                    }
                    );
                Context.SaveChanges();
            }

            if (!Context.RegistroUsersCap.Any())
            {
                Context.RegistroUsersCap.AddRange(
                    new List<RegistroUsersCap>()
                    {
                        new RegistroUsersCap(){ Name = "Tonny Stark", Tpersona = "teammates"},
                        new RegistroUsersCap(){ Name = "Rick Jones", Tpersona = "saves"},
                        new RegistroUsersCap(){ Name = "Barón Zemo", Tpersona = "enemies" }
                    }
                    );
                Context.SaveChanges();
            }

            if (!Context.tUsuario.Any())
            {
                Context.tUsuario.AddRange(
                    new List<tUsuario>()
                    {
                        new tUsuario(){ Name = "sponsors"},

                        new tUsuario(){ Name = "allies"},
                        new tUsuario(){ Name = "teammates"},
                        new tUsuario(){ Name = "saves"},
                        new tUsuario(){ Name = "enemies"}
                    }
                    );
                Context.SaveChanges();
            }
        }
    }
}
