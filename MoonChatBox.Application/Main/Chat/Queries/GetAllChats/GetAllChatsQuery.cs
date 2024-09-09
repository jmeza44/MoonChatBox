using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MoonChatBox.Application.Common.Interfaces;
using MoonChatBox.Application.Common.Models;

namespace MoonChatBox.Application.Main.Chat.Queries.GetAllChats;

public class GetAllChatsQuery : IRequest<List<ChatDto>>
{
    public sealed class GetAllChatsQueryHandler : IRequestHandler<GetAllChatsQuery, List<ChatDto>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _applicationDbContext;

        public GetAllChatsQueryHandler(IMapper mapper, IApplicationDbContext applicationDbContext)
        {
            _mapper = mapper;
            _applicationDbContext = applicationDbContext;
        }

        public async Task<List<ChatDto>> Handle(GetAllChatsQuery request, CancellationToken cancellationToken)
        {
            var chats = await _applicationDbContext.Chats.Where(chat => chat.Active)
                .ToListAsync(cancellationToken);
            return _mapper.Map<List<ChatDto>>(chats);
        }
    }
}