namespace MoonChatBox.Application.Common.Models;

public class MessageDto
{
    public int Id { get; set; }
    public required string Content { get; set; }
    public required UserSessionDto Sender { get; set; }
    public DateTime SentAt { get; set; }
    public int ChatId { get; set; }
}