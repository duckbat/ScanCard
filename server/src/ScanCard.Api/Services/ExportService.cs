using CsvHelper;
using System.Globalization;
using System.Text;
using ScanCard.Api.Models;

namespace ScanCard.Api.Services
{
    public interface IExportService
    {
        byte[] ExportToCsv(BusinessCard card);
        byte[] ExportToVCard(BusinessCard card);
    }

    public class ExportService : IExportService
    {
        public byte[] ExportToCsv(BusinessCard card)
        {
            using var memoryStream = new MemoryStream();
            using var writer = new StreamWriter(memoryStream);
            using var csv = new CsvWriter(writer, CultureInfo.InvariantCulture);

            csv.WriteHeader<BusinessCard>();
            csv.NextRecord();
            csv.WriteRecord(card);
            csv.NextRecord();
            writer.Flush();

            return memoryStream.ToArray();
        }

        public byte[] ExportToVCard(BusinessCard card)
        {
            var vcard = new StringBuilder();
            vcard.AppendLine("BEGIN:VCARD");
            vcard.AppendLine("VERSION:3.0");
            vcard.AppendLine($"FN:{card.Name}");
            vcard.AppendLine($"EMAIL:{card.Email}");
            vcard.AppendLine($"TEL:{card.Phone}");
            vcard.AppendLine($"ORG:{card.Company}");
            vcard.AppendLine("END:VCARD");

            return Encoding.UTF8.GetBytes(vcard.ToString());
        }
    }
}