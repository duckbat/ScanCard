using Microsoft.OpenApi.Models;

namespace ScanCard.Api.Configurations;

public static class SwaggerConfig
{
    public static IServiceCollection AddSwaggerConfiguration(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "ScanCard API",
                Description = "Digital Business Card Manager API",
                Version = "v1"
            });
        });

        return services;
    }

    public static IApplicationBuilder UseSwaggerConfiguration(this IApplicationBuilder app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "ScanCard API V1");
            c.RoutePrefix = string.Empty;
        });

        return app;
    }
}