using System.Net;
using System.Text.Json;
using MoonChatBox.Application.Common.Exceptions;

namespace MoonChatBox.WebApi.Common.Middlewares
{
    public class GlobalExceptionHandlerMiddleware(RequestDelegate next)
    {
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (NotFoundException ex)
            {
                await HandleNotFoundExceptionAsync(context, ex);
            }
        }

        private static Task HandleNotFoundExceptionAsync(HttpContext context, NotFoundException exception)
        {
            var response = new { message = "Resource not found.", details = exception.Message };
            var jsonResponse = JsonSerializer.Serialize(response);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.NotFound;
            return context.Response.WriteAsync(jsonResponse);
        }
    }
}