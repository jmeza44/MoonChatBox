using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MoonChatBox.Application.Common.Exceptions;
using MoonChatBox.Application.Common.Interfaces;
using MoonChatBox.Application.Common.Models;
using MoonChatBox.Domain.Entities;

namespace MoonChatBox.Application.Main.Messages.Commands.SendMessageToChat;

public class SendMessageToChatCommand : IRequest<int>
{
    public int UserSessionId { get; set; }
    public int ChatId { get; set; }
    public required string MessageContent { get; set; }

    public sealed class SendMessageToChatCommandHandler : IRequestHandler<SendMessageToChatCommand, int>
    {
        private readonly IMapper _mapper;
        private readonly IChatService _chatService;
        private readonly IApplicationDbContext _applicationDbContext;

        public SendMessageToChatCommandHandler(IMapper mapper, IChatService chatService,
            IApplicationDbContext applicationDbContext)
        {
            _mapper = mapper;
            _chatService = chatService;
            _applicationDbContext = applicationDbContext;
        }

        public async Task<int> Handle(SendMessageToChatCommand request, CancellationToken cancellationToken)
        {
            var userSession =
                await _applicationDbContext.UserSessions.FirstOrDefaultAsync(us => us.Id == request.UserSessionId,
                    cancellationToken: cancellationToken);

            var chat = await _applicationDbContext.Chats.FirstOrDefaultAsync(ch => ch.Id == request.ChatId,
                cancellationToken);

            if (userSession == null) throw new UnresolvedIdentityException();
            if (chat == null) throw new NotFoundException("Chat", request.ChatId);

            var userSessionDto = _mapper.Map<UserSessionDto>(userSession);
            var messageReceivedAt = DateTime.UtcNow;

            await _chatService.SendMessageAsync(chat.Id, request.MessageContent, messageReceivedAt, userSessionDto);

            _applicationDbContext.Messages.Add(new Message
            {
                Content = request.MessageContent,
                SentAt = messageReceivedAt,
                ChatId = request.ChatId,
                UserSessionId = userSession.Id,
                Chat = chat,
                UserSession = userSession,
            });

            chat.LastMessage = request.MessageContent;
            chat.LastMessageSentAt = messageReceivedAt;

            return await _applicationDbContext.SaveChangesAsync(cancellationToken);
        }
    }
}