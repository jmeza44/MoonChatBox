using MediatR;
using Microsoft.EntityFrameworkCore;
using MoonChatBox.Application.Common.Interfaces;

namespace MoonChatBox.Application.Main.UserSession.Commands.InitUserSession;

public class InitUserSessionCommand : IRequest<int>
{
    public required string Nickname { get; set; }
    public required string Avatar { get; set; }

    public sealed class InitUserSessionCommandHandler : IRequestHandler<InitUserSessionCommand, int>
    {
        private readonly IApplicationDbContext _applicationDbContext;

        public InitUserSessionCommandHandler(IApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public async Task<int> Handle(InitUserSessionCommand command, CancellationToken cancellationToken)
        {
            var existingUserSession =
                await _applicationDbContext.UserSessions.FirstOrDefaultAsync(us => us.NickName == command.Nickname,
                    cancellationToken);

            if (existingUserSession != null) return existingUserSession.Id;

            var newUserSession = new Domain.Entities.UserSession()
            {
                NickName = command.Nickname,
                AvatarPictureName = command.Avatar,
                StartedAt = DateTime.UtcNow
            };

            _applicationDbContext.UserSessions.Add(newUserSession);
            await _applicationDbContext.SaveChangesAsync(cancellationToken);
            return newUserSession.Id;
        }
    }
}