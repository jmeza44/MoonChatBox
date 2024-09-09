using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MoonChatBox.Application.Common.Interfaces;
using MoonChatBox.Application.Common.Models;

namespace MoonChatBox.Application.Main.Messages.Queries.GetMessagesFromChat;

public class GetMessagesFromChatQuery : IRequest<List<MessageDto>>
{
    public int ChatId { get; set; }

    public sealed class GetMessageFromChatQueryHandler : IRequestHandler<GetMessagesFromChatQuery, List<MessageDto>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _applicationDbContext;

        public GetMessageFromChatQueryHandler(IMapper mapper, IApplicationDbContext applicationDbContext)
        {
            _mapper = mapper;
            _applicationDbContext = applicationDbContext;
        }

        public async Task<List<MessageDto>> Handle(GetMessagesFromChatQuery request,
            CancellationToken cancellationToken)
        {
            var messages = await _applicationDbContext.Messages
                .Include(message => message.UserSession)
                .Where(message => message.ChatId == request.ChatId && message.Chat.Active)
                .OrderBy(message => message.SentAt)
                .ToListAsync(cancellationToken);
            return _mapper.Map<List<MessageDto>>(messages);
        }
    }
}