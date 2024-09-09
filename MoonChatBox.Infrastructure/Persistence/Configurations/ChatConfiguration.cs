using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoonChatBox.Domain.Entities;

namespace MoonChatBox.Infrastructure.Persistence.Configurations;

public class ChatConfiguration : IEntityTypeConfiguration<Chat>
{
    public void Configure(EntityTypeBuilder<Chat> builder)
    {
        builder.HasKey(ch => ch.Id);

        builder.Property(ch => ch.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(ch => ch.Picture)
            .IsRequired();

        builder.Property(ch => ch.LastMessage)
            .IsRequired();

        builder.Property(ch => ch.LastMessageSentAt)
            .IsRequired();

        builder.HasMany(ch => ch.Messages)
            .WithOne(m => m.Chat)
            .HasForeignKey(m => m.ChatId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}