namespace MoonChatBox.Domain.Entities;

public class UserSession
{
    public int Id { get; set; }
    public required string NickName { get; set; }
    public required string AvatarPictureName { get; set; }
    public DateTime StartedAt { get; set; }

    public ICollection<Message>? Messages { get; set; }
}