using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MoonChatBox.Domain.Entities;

namespace MoonChatBox.Infrastructure.Persistence.Configurations;

public class MessageConfiguration : IEntityTypeConfiguration<Message>
{
    public void Configure(EntityTypeBuilder<Message> builder)
    {
        builder.HasKey(m => m.Id);

        builder.Property(m => m.Content)
            .IsRequired();

        builder.Property(m => m.SentAt)
            .IsRequired();

        builder.HasOne(m => m.Chat)
            .WithMany(ch => ch.Messages)
            .HasForeignKey(m => m.ChatId) 
            .OnDelete(DeleteBehavior.Cascade);
    }
}