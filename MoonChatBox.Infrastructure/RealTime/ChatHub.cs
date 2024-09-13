using Microsoft.AspNetCore.SignalR;
using MoonChatBox.Domain.Entities;

namespace MoonChatBox.Infrastructure.RealTime;

public class ChatHub : Hub
{
    public async Task JoinChat(int chatId, string userNickname)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId.ToString());
        await Clients.Group(chatId.ToString()).SendAsync("UserJoined", userNickname, chatId);
    }

    public async Task LeaveChat(int chatId, string userNickname)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId.ToString());
        await Clients.Group(chatId.ToString()).SendAsync("UserLeft", userNickname, chatId);
    }

    public async Task SendMessage(int chatId, string message, DateTime receivedAt, UserSession userSession)
    {
        await Clients.Group(chatId.ToString()).SendAsync("ReceiveMessage", chatId, message, receivedAt, userSession);
    }

    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
        await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await base.OnDisconnectedAsync(exception);
        await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
    }
}