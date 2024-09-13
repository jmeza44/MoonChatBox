using Microsoft.AspNetCore.SignalR;
using MoonChatBox.Application.Common.Interfaces;
using MoonChatBox.Application.Common.Models;
using MoonChatBox.Infrastructure.RealTime;

namespace MoonChatBox.Infrastructure.Services;

public class ChatService(IHubContext<ChatHub> hubContext) : IChatService
{
    public async Task SendMessageAsync(int chatId, string message, DateTime receivedAt, UserSessionDto userSession)
    {
        await hubContext.Clients.Group(chatId.ToString())
            .SendAsync("ReceiveMessage", chatId, message, receivedAt, userSession);
    }
}