using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MoonChatBox.Application.Common.Constants;
using MoonChatBox.Application.Common.Exceptions;
using MoonChatBox.Application.Common.Interfaces;
using MoonChatBox.Application.Common.Models;
using MoonChatBox.Domain.Entities;

namespace MoonChatBox.Application.Main.Chat.Commands.ChatAction;

public class ChatActionCommand : IRequest<bool>
{
    public int ChatId { get; set; }
    public required string UserNickname { get; set; }
    public bool IsJoining { get; set; } // True for join, false for leave

    public sealed class ChatActionCommandHandler(
        IMapper mapper,
        IChatService chatService,
        IApplicationDbContext applicationDbContext)
        : IRequestHandler<ChatActionCommand, bool>
    {
        public async Task<bool> Handle(ChatActionCommand request, CancellationToken cancellationToken)
        {
            var chat = await GetChatByIdAsync(request.ChatId, cancellationToken);

            if (chat == null) throw new NotFoundException("Chat", request.ChatId);

            var userSession = await GetSystemUserSession(cancellationToken) ??
                              await CreateSystemUserSessionAsync(cancellationToken);

            var userSessionDto = mapper.Map<UserSessionDto>(userSession);
            var messageReceivedAt = DateTime.UtcNow;
            var actionMessage = request.IsJoining
                ? $"{request.UserNickname} joined the chat!"
                : $"{request.UserNickname} left the chat!";

            await chatService.SendMessageAsync(chat.Id, actionMessage, messageReceivedAt, userSessionDto);

            AddMessageToChat(request.ChatId, actionMessage, messageReceivedAt, userSession, chat);
            UpdateChatLastMessageAndSentDate(chat, actionMessage, messageReceivedAt);

            return await applicationDbContext.SaveChangesAsync(cancellationToken) > 0;
        }

        private static void UpdateChatLastMessageAndSentDate(Domain.Entities.Chat chat, string message,
            DateTime messageReceivedAt)
        {
            chat.LastMessage = message;
            chat.LastMessageSentAt = messageReceivedAt;
        }

        private void AddMessageToChat(int chatId, string message, DateTime messageReceivedAt,
            Domain.Entities.UserSession userSession, Domain.Entities.Chat chat)
        {
            applicationDbContext.Messages.Add(new Message
            {
                Content = message,
                SentAt = messageReceivedAt,
                ChatId = chatId,
                UserSessionId = userSession.Id,
                Chat = chat,
                UserSession = userSession,
            });
        }

        private async Task<Domain.Entities.UserSession> CreateSystemUserSessionAsync(
            CancellationToken cancellationToken)
        {
            var userSession = new Domain.Entities.UserSession
            {
                NickName = UserSessionConstants.SystemNickname,
                AvatarPictureName = UserSessionConstants.SystemAvatar,
                StartedAt = DateTime.UtcNow
            };
            applicationDbContext.UserSessions.Add(userSession);
            await applicationDbContext.SaveChangesAsync(cancellationToken);
            return userSession;
        }

        private async Task<Domain.Entities.Chat?> GetChatByIdAsync(int chatId,
            CancellationToken cancellationToken = default)
        {
            return await applicationDbContext.Chats.FirstOrDefaultAsync(ch => ch.Id == chatId, cancellationToken);
        }

        private async Task<Domain.Entities.UserSession?> GetSystemUserSession(
            CancellationToken cancellationToken = default)
        {
            return await applicationDbContext.UserSessions.FirstOrDefaultAsync(
                us => us.NickName == UserSessionConstants.SystemNickname,
                cancellationToken);
        }
    }
}