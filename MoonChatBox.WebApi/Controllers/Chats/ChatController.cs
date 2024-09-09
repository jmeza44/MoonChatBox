using Microsoft.AspNetCore.Mvc;
using MoonChatBox.Application.Common.Models;
using MoonChatBox.Application.Main.Chat.Queries.GetAllChats;

namespace MoonChatBox.WebApi.Controllers.Chats;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ApiController
{
    [HttpGet("GetALL")]
    public async Task<ActionResult<List<ChatDto>>> GetAllChats([FromQuery] GetAllChatsQuery request)
    {
        var result = await Mediator.Send(request);
        return Ok(result);
    }
}