using Microsoft.AspNetCore.Mvc;
using MoonChatBox.Application.Common.Models;
using MoonChatBox.Application.Main.Messages.Commands.SendMessageToChat;
using MoonChatBox.Application.Main.Messages.Queries.GetMessagesFromChat;

namespace MoonChatBox.WebApi.Controllers.Messages;

[ApiController]
[Route("api/[controller]")]
public class MessageController : ApiController
{
    [HttpGet("GetMessagesFromChat")]
    public async Task<ActionResult<List<MessageDto>>> GetMessagesFromChat([FromQuery] GetMessagesFromChatQuery request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [HttpPost("Send")]
    public async Task<ActionResult<int>> SendMessageToChat([FromBody] SendMessageToChatCommand request)
    {
        var result = await Mediator.Send(request);
        return Created("api/Message/Send", result);
    }
}