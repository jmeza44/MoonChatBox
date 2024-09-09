using MediatR.Pipeline;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace MoonChatBox.Application.Common.Behaviours
{
    public class LoggingBehaviour<TRequest>(ILogger<TRequest> logger) : IRequestPreProcessor<TRequest>
        where TRequest : notnull
    {
        private readonly ILogger _logger = logger;

        public Task Process(TRequest request, CancellationToken cancellationToken)
        {
            var requestName = typeof(TRequest).Name;
            var projectName = Assembly.GetEntryAssembly()?.GetName().Name;

            _logger.LogInformation("{ProjectName} Request: {Name}_{@Request}",
                projectName, requestName, request);

            return Task.CompletedTask;
        }
    }
}