using System.ComponentModel.DataAnnotations;

namespace OrderingSystemAFG.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}