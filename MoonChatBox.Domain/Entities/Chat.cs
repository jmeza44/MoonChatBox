namespace MoonChatBox.Domain.Entities;

public class Chat
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Picture { get; set; }
    public bool Active { get; set; }
    public required string LastMessage { get; set; }
    public DateTime LastMessageSentAt { get; set; }

    public ICollection<Message>? Messages { get; set; }
}