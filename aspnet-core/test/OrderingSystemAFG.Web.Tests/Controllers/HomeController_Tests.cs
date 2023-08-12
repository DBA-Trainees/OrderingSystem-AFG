using System.Threading.Tasks;
using OrderingSystemAFG.Models.TokenAuth;
using OrderingSystemAFG.Web.Controllers;
using Shouldly;
using Xunit;

namespace OrderingSystemAFG.Web.Tests.Controllers
{
    public class HomeController_Tests: OrderingSystemAFGWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}