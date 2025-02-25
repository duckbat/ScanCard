using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScanCard.Api.Data;
using ScanCard.Api.Models;
using ScanCard.Api.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace ScanCard.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ScanCardContext _context;

        public UsersController(ScanCardContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users.Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                CreatedAt = u.CreatedAt
            }).ToList();
        }

        // GET: api/Users/:id
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<UserDto>> GetUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return new UserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            };
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/Users/:id
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<object>> PutUser(Guid id, UpdateUserDto updateDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != id.ToString())
            {
                return Forbid();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Username = updateDto.Username;
            user.Email = updateDto.Email;
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updateDto.Password);

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "User updated successfully"});
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                throw;
            }
        }

        // DELETE: api/Users/:id
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<object>> DeleteUser(Guid id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId != id.ToString())
            {
                return Forbid();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully"});
        }
    }
}