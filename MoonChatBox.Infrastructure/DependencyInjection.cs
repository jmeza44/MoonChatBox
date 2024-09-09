using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MoonChatBox.Application.Common.Interfaces;
using MoonChatBox.Infrastructure.Persistence;
using MoonChatBox.Infrastructure.Services;

namespace MoonChatBox.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("ApplicationDatabase"), b =>
            {
                b.EnableRetryOnFailure();
                b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName);
            }));

        services.AddScoped<IApplicationDbContext, ApplicationDbContext>();

        services.AddScoped<IChatService, ChatService>();

        return services;
    }
}