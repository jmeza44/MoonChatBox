namespace MoonChatBox.Application.Common.Models;

public class UserSessionDto
{
    public required int Id { get; set; }
    public required string Nickname { get; set; }
    public required string Avatar { get; set; }
}