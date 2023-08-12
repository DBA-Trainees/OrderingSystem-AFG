using Abp.Application.Services.Dto;

namespace OrderingSystemAFG.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

