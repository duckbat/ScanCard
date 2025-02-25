using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ScanCard.Api.Data;
using ScanCard.Api.Models;
using ScanCard.Api.DTOs;
using ScanCard.Api.Services;
using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace ScanCard.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessCardsController : ControllerBase
    {
        private readonly ScanCardContext _context;
        private readonly IExportService _exportService;

        public BusinessCardsController(ScanCardContext context, IExportService exportService)
        {
            _context = context;
            _exportService = exportService;
        }

        // GET: api/BusinessCards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessCard>>> GetBusinessCards()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest(new { message = "User ID not found in token", statusCode = 400 });
                }

                var businessCards = await _context.BusinessCards
                    .Include(b => b.User)
                    .Where(b => b.UserId == Guid.Parse(userId))
                    .Select(b => new
                    {
                        b.Id,
                        b.Name,
                        b.Email,
                        b.Phone,
                        b.Company,
                        b.CreatedAt,
                        b.UserId,
                        User = new
                        {
                            b.User.Id,
                            b.User.Username,
                            b.User.Email,
                            b.User.CreatedAt
                        }
                    })
                    .ToListAsync();

                return Ok(new
                {
                    message = "Business cards retrieved successfully",
                    data = businessCards,
                    statusCode = 200
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new 
                { 
                    message = "Error retrieving business cards", 
                    error = ex.Message, 
                    statusCode = 500 
                });
            }
        }

        // GET: api/BusinessCards/:id
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessCard>> GetBusinessCard(Guid id)
        {
            try
            {
                var businessCard = await _context.BusinessCards
                    .Include(b => b.User)
                    .Select(b => new
                    {
                        b.Id,
                        b.Name,
                        b.Email,
                        b.Phone,
                        b.Company,
                        b.CreatedAt,
                        b.UserId,
                        User = new
                        {
                            b.User.Id,
                            b.User.Username,
                            b.User.Email,
                            b.User.CreatedAt
                        }
                    })
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (businessCard == null)
                {
                    return NotFound(new
                    {
                        message = "Business card not found",
                        statusCode = 404
                    });
                }

                return Ok(new
                {
                    message = "Business card retrieved successfully",
                    data = businessCard,
                    statusCode = 200
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Error retrieving business card",
                    error = ex.Message,
                    statusCode = 500
                });
            }
        }

        // POST: api/BusinessCards
        [HttpPost]
        public async Task<ActionResult<BusinessCard>> PostBusinessCard(BusinessCardDto cardDto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest(new { message = "User ID not found in token", statusCode = 400 });
                }

                var businessCard = new BusinessCard
                {
                    Name = cardDto.Name,
                    Email = cardDto.Email,
                    Phone = cardDto.Phone,
                    Company = cardDto.Company,
                    UserId = Guid.Parse(userId)
                };

                _context.BusinessCards.Add(businessCard);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetBusinessCard),
                    new { id = businessCard.Id },
                    new { message = "Business card created successfully", data = businessCard, statusCode = 201 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating business card", error = ex.Message, statusCode = 500 });
            }
        }

        // PUT: api/BusinessCards/:id
        [HttpPut("{id}")]
        public async Task<ActionResult<object>> PutBusinessCard(Guid id, BusinessCardDto cardDto)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest(new { message = "User ID not found in token", statusCode = 400 });
                }

                var businessCard = await _context.BusinessCards
                    .FirstOrDefaultAsync(b => b.Id == id && b.UserId == Guid.Parse(userId));

                if (businessCard == null)
                {
                    return NotFound(new { message = "Business card not found", statusCode = 404 });
                }

                businessCard.Name = cardDto.Name;
                businessCard.Email = cardDto.Email;
                businessCard.Phone = cardDto.Phone;
                businessCard.Company = cardDto.Company;

                await _context.SaveChangesAsync();
                return Ok(new { message = "Business card updated successfully", statusCode = 200 });
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(409, new { message = "Concurrency conflict", statusCode = 409 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating business card", error = ex.Message, statusCode = 500 });
            }
        }

        // DELETE: api/BusinessCards/:id
        [HttpDelete("{id}")]
        public async Task<ActionResult<object>> DeleteBusinessCard(Guid id)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (string.IsNullOrEmpty(userId))
                {
                    return BadRequest(new { message = "User ID not found in token", statusCode = 400 });
                }

                var businessCard = await _context.BusinessCards
                    .FirstOrDefaultAsync(b => b.Id == id && b.UserId == Guid.Parse(userId));

                if (businessCard == null)
                {
                    return NotFound(new { message = "Business card not found", statusCode = 404 });
                }

                _context.BusinessCards.Remove(businessCard);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Business card deleted successfully", statusCode = 200 });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting business card", error = ex.Message, statusCode = 500 });
            }
        }

        [HttpGet("{id}/export/csv")]
        [AllowAnonymous]
        public async Task<IActionResult> ExportToCsv(Guid id)
        {
            try
            {
                var businessCard = await _context.BusinessCards
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (businessCard == null)
                {
                    return NotFound(new { message = "Business card not found", statusCode = 404 });
                }

                var csvBytes = _exportService.ExportToCsv(businessCard);
                return File(csvBytes, "text/csv", $"{businessCard.Name}-card.csv");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error exporting to CSV", error = ex.Message, statusCode = 500 });
            }
        }

        [HttpGet("{id}/export/vcard")]
        [AllowAnonymous]
        public async Task<IActionResult> ExportToVCard(Guid id)
        {
            try
            {
                var businessCard = await _context.BusinessCards
                    .FirstOrDefaultAsync(b => b.Id == id);

                if (businessCard == null)
                {
                    return NotFound(new { message = "Business card not found", statusCode = 404 });
                }

                var vcardBytes = _exportService.ExportToVCard(businessCard);
                return File(vcardBytes, "text/vcard", $"{businessCard.Name}.vcf");
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error exporting to vCard", error = ex.Message, statusCode = 500 });
            }
        }
    }
}