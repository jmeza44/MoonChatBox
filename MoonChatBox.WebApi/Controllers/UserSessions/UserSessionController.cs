using Microsoft.AspNetCore.Mvc;
using MoonChatBox.Application.Common.Models;
using MoonChatBox.Application.Main.UserSession.Commands.InitUserSession;
using MoonChatBox.Application.Main.UserSession.Queries.GetUserSession;

namespace MoonChatBox.WebApi.Controllers.UserSessions;

[ApiController]
[Route("api/[controller]")]
public class UserSessionController : ApiController
{
    [HttpGet("GetUserSession")]
    public async Task<ActionResult<UserSessionDto>> GetUserSession([FromQuery] GetUserSessionQuery request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [HttpPost("InitUserSession")]
    public async Task<ActionResult<int>> InitUserSession([FromBody] InitUserSessionCommand command)
    {
        var result = await Mediator.Send(command);
        return Created("api/UserSession/InitUserSession", result);
    }
}