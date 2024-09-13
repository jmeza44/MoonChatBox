using MediatR;
using Microsoft.AspNetCore.Mvc;

# nullable disable

namespace MoonChatBox.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiController : ControllerBase
    {
#pragma warning disable CS0649 // Field is never assigned to, and will always have its default value
        private readonly ISender _mediator;
#pragma warning restore CS0649 // Field is never assigned to, and will always have its default value
        protected ISender Mediator => _mediator ?? HttpContext.RequestServices.GetService<IMediator>();
    }
}