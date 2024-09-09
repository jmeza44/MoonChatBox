using MoonChatBox.Application.Common.Interfaces;
using MoonChatBox.Domain.Entities;

namespace MoonChatBox.Application.Common.Models;

public class ChatDto
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string LastMessage { get; set; }
    public DateTime LastMessageSentAt { get; set; }
    public required string PictureUrl { get; set; }
}