using MoonChatBox.Application.Common.Models;

namespace MoonChatBox.Application.Common.Interfaces;

public interface IChatService
{
    Task SendMessageAsync(int chatId, string message, DateTime receivedAt, UserSessionDto userSession);
}