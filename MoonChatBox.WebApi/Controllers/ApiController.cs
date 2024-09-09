using MediatR;
using Microsoft.AspNetCore.Mvc;

# nullable disable

namespace MoonChatBox.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiController : ControllerBase
    {
        private readonly ISender _mediator;
        protected ISender Mediator => _mediator ?? HttpContext.RequestServices.GetService<IMediator>();
    }
}