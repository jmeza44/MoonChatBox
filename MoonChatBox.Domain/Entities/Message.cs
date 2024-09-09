namespace MoonChatBox.Domain.Entities;

public class Message
{
    public int Id { get; set; }
    public required string Content { get; set; }
    public DateTime SentAt { get; set; }

    public int ChatId { get; set; }
    public required Chat Chat { get; set; }
    public int UserSessionId { get; set; }
    public required UserSession UserSession { get; set; }
}