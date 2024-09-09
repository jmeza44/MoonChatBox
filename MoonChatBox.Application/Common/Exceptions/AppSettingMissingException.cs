namespace MoonChatBox.Application.Common.Exceptions;

public class AppSettingMissingException(string missingKey)
    : Exception($"Missing value in appsettings.json for key: {missingKey}")
{
    public string MissingKey { get; } = missingKey;
}