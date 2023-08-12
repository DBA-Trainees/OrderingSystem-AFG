using Abp.AutoMapper;
using OrderingSystemAFG.Authentication.External;

namespace OrderingSystemAFG.Models.TokenAuth
{
    [AutoMapFrom(typeof(ExternalLoginProviderInfo))]
    public class ExternalLoginProviderInfoModel
    {
        public string Name { get; set; }

        public string ClientId { get; set; }
    }
}
