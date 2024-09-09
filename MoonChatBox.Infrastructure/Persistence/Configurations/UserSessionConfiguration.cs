using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoonChatBox.Domain.Entities;

namespace MoonChatBox.Infrastructure.Persistence.Configurations;

public class UserSessionConfiguration : IEntityTypeConfiguration<UserSession>
{
    public void Configure(EntityTypeBuilder<UserSession> builder)
    {
        builder.HasKey(us => us.Id);

        builder.Property(us => us.NickName)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(us => us.AvatarPictureName)
            .IsRequired();

        builder.Property(us => us.StartedAt)
            .IsRequired();

        builder.HasMany(us => us.Messages)
            .WithOne(m => m.UserSession)
            .HasForeignKey(m => m.UserSessionId);
    }
}