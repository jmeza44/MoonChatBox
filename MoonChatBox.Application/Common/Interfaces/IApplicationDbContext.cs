using Microsoft.EntityFrameworkCore;
using MoonChatBox.Domain.Entities;

namespace MoonChatBox.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Chat> Chats { get; set; }
    DbSet<Message> Messages { get; set; }
    DbSet<UserSession> UserSessions { get; set; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken());
}