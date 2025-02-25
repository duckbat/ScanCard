using Microsoft.EntityFrameworkCore;
using ScanCard.Api.Models;

namespace ScanCard.Api.Data
{
    public class ScanCardContext : DbContext
    {
        public ScanCardContext(DbContextOptions<ScanCardContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<BusinessCard> BusinessCards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BusinessCard>()
                .HasOne(b => b.User)
                .WithMany(u => u.BusinessCards)
                .HasForeignKey(b => b.UserId);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}