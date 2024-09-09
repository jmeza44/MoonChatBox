using FluentValidation.AspNetCore;
using MoonChatBox.Application.Common.Exceptions;
using MoonChatBox.Infrastructure.RealTime;
using MoonChatBox.WebApi.Common.Middlewares;

namespace MoonChatBox.WebApi
{
    public static class DependencyConfig
    {
        public static IServiceCollection AddAspNetServices(this IServiceCollection services, IConfiguration config)
        {
            string[] allowedOrigins = config.GetSection("App:CorsPolicy:AllowedOrigins").Get<string[]>() ??
                                      throw new AppSettingMissingException("App:CorsPolicy:AllowedOrigins");
            string policyName = config.GetValue<string>("App:CorsPolicy:Name") ??
                                throw new AppSettingMissingException("App:CorsPolicy:Name");

            services.AddControllers();
            services.AddSignalR();
            services.AddCors(options =>
            {
                options.AddPolicy(policyName,
                    builder =>
                    {
                        builder.WithOrigins(allowedOrigins)
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });
            services.AddHttpClient();

            return services;
        }

        public static IServiceCollection AddAuthenticationServices(this IServiceCollection services,
            IConfiguration config)
        {
            return services;
        }

        public static IServiceCollection AddFluentValidations(this IServiceCollection services)
        {
            services.AddFluentValidationAutoValidation()
                .AddFluentValidationClientsideAdapters();

            return services;
        }

        public static WebApplication ConfigurePipeline(this WebApplication app)
        {
            var policyName = app.Configuration.GetValue<string>("App:CorsPolicy:Name") ??
                             throw new AppSettingMissingException("App:CorsPolicy:Name");

            if (app.Environment.IsDevelopment() || app.Environment.IsEnvironment("Local"))
            {
            }

            app.UseHttpsRedirection();
            app.UseCors(policyName);
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseMiddleware<GlobalExceptionHandlerMiddleware>();
            app.MapControllers();
            app.MapHub<ChatHub>("/ChatHub");

            return app;
        }
    }
}