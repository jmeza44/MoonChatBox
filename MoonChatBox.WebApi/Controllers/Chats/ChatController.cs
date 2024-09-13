using Microsoft.AspNetCore.Mvc;
using MoonChatBox.Application.Common.Models;
using MoonChatBox.Application.Main.Chat.Commands.ChatAction;
using MoonChatBox.Application.Main.Chat.Queries.GetAllChats;

namespace MoonChatBox.WebApi.Controllers.Chats;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ApiController
{
    [HttpGet("GetAll")]
    public async Task<ActionResult<List<ChatDto>>> GetAllChats([FromQuery] GetAllChatsQuery request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }

    [HttpPost("ChatAction")]
    public async Task<ActionResult<bool>> ChatAction([FromBody] ChatActionCommand command)
    {
        var result = await Mediator.Send(command);
        return Ok(result);
    }
}