using Microsoft.AspNetCore.Mvc;
using ScanCard.Api.Models;
using ScanCard.Api.Services;
using ScanCard.Api.DTOs;

namespace ScanCard.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public ActionResult<AuthResponseDto> Register([FromBody] RegisterDto registerDto)
        {
            try 
            {
                var user = new User
                {
                    Username = registerDto.Username,
                    Email = registerDto.Email
                };

                var result = _authService.Register(user, registerDto.Password);
                return Ok(new AuthResponseDto 
                { 
                    Token = result,
                    Username = user.Username,
                    Email = user.Email 
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public ActionResult<AuthResponseDto> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var result = _authService.Login(loginDto.Email, loginDto.Password);
                return Ok(new AuthResponseDto 
                { 
                    Token = result.Token,
                    Username = result.Username,
                    Email = result.Email 
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}