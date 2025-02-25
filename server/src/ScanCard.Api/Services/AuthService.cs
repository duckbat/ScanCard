// filepath: /Users/khaichan/Desktop/Metropolia/K-2025/ScanCard/server/src/ScanCard.Api/Services/AuthService.cs
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ScanCard.Api.Models;
using ScanCard.Api.Data;

namespace ScanCard.Api.Services
{
    public interface IAuthService
    {
        string Register(User user, string password);
        (string Token, string Username, string Email) Login(string email, string password);
    }

    public class AuthService : IAuthService
    {
        private readonly ScanCardContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(ScanCardContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public string Register(User user, string password)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
            _context.Users.Add(user);
            _context.SaveChanges();
            return GenerateJwtToken(user);
        }

        public (string Token, string Username, string Email) Login(string email, string password)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }

            return (GenerateJwtToken(user), user.Username, user.Email);
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}