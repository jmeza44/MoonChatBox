using MoonChatBox.Application;
using MoonChatBox.Infrastructure;
using MoonChatBox.WebApi;
using MoonChatBox.WebApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAspNetServices(builder.Configuration)
    .AddApplication()
    .AddInfrastructure(builder.Configuration)
    .AddFluentValidations()
    .AddAuthenticationServices(builder.Configuration);

var app = builder.Build();

app.ConfigurePipeline();

await app.MigrateApplicationDatabaseAsync();

app.Run();