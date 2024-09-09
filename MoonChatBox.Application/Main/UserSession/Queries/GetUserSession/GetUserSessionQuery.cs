using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MoonChatBox.Application.Common.Exceptions;
using MoonChatBox.Application.Common.Interfaces;
using MoonChatBox.Application.Common.Models;

namespace MoonChatBox.Application.Main.UserSession.Queries.GetUserSession;

public class GetUserSessionQuery : IRequest<UserSessionDto>
{
    public int UserSessionId { get; set; }

    public sealed class GetUserSessionQueryHandler : IRequestHandler<GetUserSessionQuery, UserSessionDto>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _applicationDbContext;

        public GetUserSessionQueryHandler(IMapper mapper, IApplicationDbContext applicationDbContext)
        {
            _mapper = mapper;
            _applicationDbContext = applicationDbContext;
        }

        public async Task<UserSessionDto> Handle(GetUserSessionQuery request, CancellationToken cancellationToken)
        {
            var userSession =
                await _applicationDbContext.UserSessions.FirstOrDefaultAsync(us => us.Id == request.UserSessionId,
                    cancellationToken);
            if (userSession == null) throw new NotFoundException("UserSession", request.UserSessionId);
            return _mapper.Map<UserSessionDto>(userSession);
        }
    }
}