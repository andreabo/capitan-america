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
            services.AddCors(options => {
                options.AddPolicy("AllowMyOrigin", 
                    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()
                    );
            });

            services.AddDbContext<ApplicationDbContext>(options => options.UseInMemoryDatabase("CapDB"));
            
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1).AddJsonOptions(ConfigureJson);
        }

        private void ConfigureJson(MvcJsonOptions obj)
        {
            obj.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
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

            app.UseCors("AllowMyOrigin");
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

            //if (!Context.RegistroUsersCap.Any())
            //{
            //    Context.RegistroUsersCap.AddRange(
            //        new List<RegistroUsersCap>()
            //        {
            //            new RegistroUsersCap(){ Name = "Tonny Stark", Tpersona = "teammates"},
            //            new RegistroUsersCap(){ Name = "Rick Jones", Tpersona = "saves"},
            //            new RegistroUsersCap(){ Name = "Barón Zemo", Tpersona = "enemies" }
            //        }
            //        );
            //    Context.SaveChanges();
            //}

            if (!Context.tUsuario.Any())
            {
                Context.tUsuario.AddRange(
                    new List<tUsuario>()
                    {
                        new tUsuario(){ Name = "sponsors",
                            Usuarios =  new List<RegistroUsersCap>(){
                                new RegistroUsersCap { Name = "Shield" }
                        } },

                        new tUsuario(){ Name = "allies",
                            Usuarios = new List<RegistroUsersCap>(){
                                new RegistroUsersCap { Name = "Stephen Strange"},
                                new RegistroUsersCap { Name = "Máquina de Guerra"}
                            } },
                        new tUsuario(){ Name = "teammates",
                            Usuarios = new List<RegistroUsersCap>(){
                                new RegistroUsersCap { Name = "Tony Stark"},
                                new RegistroUsersCap { Name = "Bruce Banner"},
                                new RegistroUsersCap { Name = "Thor"}
                            }
                        },
                        new tUsuario(){ Name = "saves",
                            Usuarios = new List<RegistroUsersCap>() {
                                new RegistroUsersCap { Name = "Rick Jones"}
                            }
                        },
                        new tUsuario(){ Name = "enemies",
                            Usuarios = new List<RegistroUsersCap>(){
                                new RegistroUsersCap { Name = "Barón Zemo"},
                                new RegistroUsersCap { Name = "Hydra"},
                                new RegistroUsersCap { Name = "Thanos"}
                            }
                        }
                    }
                    );
                Context.SaveChanges();
            }
        }
    }
}
