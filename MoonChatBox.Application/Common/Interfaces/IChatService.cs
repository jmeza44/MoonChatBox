using MoonChatBox.Application.Common.Models;
using MoonChatBox.Domain.Entities;

namespace MoonChatBox.Application.Common.Interfaces;

public interface IChatService
{
    Task SendMessageAsync(int chatId, string message, DateTime receivedAt, UserSessionDto userSession);
}