using System.Reflection;
using AutoMapper;
using MoonChatBox.Application.Common.Interfaces;
using MoonChatBox.Application.Common.Models;
using MoonChatBox.Domain.Entities;

namespace MoonChatBox.Application.Common.Mapping;

public class Automapping : Profile
{
    public Automapping()
    {
        CreateMap<Chat, ChatDto>()
            .ForMember(c => c.PictureUrl,
                opt => opt.MapFrom(c => c.Picture));
        CreateMap<Message, MessageDto>()
            .ForMember(m => m.Sender,
                opt => opt.MapFrom(m => m.UserSession));
        CreateMap<UserSession, UserSessionDto>()
            .ForMember(us => us.Avatar,
                opt => opt.MapFrom(us => us.AvatarPictureName));
        ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
    }

    private void ApplyMappingsFromAssembly(Assembly assembly)
    {
        var types = assembly.GetExportedTypes()
            .Where(t => t.GetInterfaces().Any(i =>
                i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IMapFrom<>)))
            .ToList();

        foreach (var type in types)
        {
            var instance = Activator.CreateInstance(type);

            var methodInfo = type.GetMethod("Mapping")
                             ?? type.GetInterface("IMapFrom`1")!.GetMethod("Mapping");

            methodInfo?.Invoke(instance, new object[] { this });
        }
    }
}