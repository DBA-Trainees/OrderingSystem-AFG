FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/OrderingSystemAFG.Web.Host/OrderingSystemAFG.Web.Host.csproj", "src/OrderingSystemAFG.Web.Host/"]
COPY ["src/OrderingSystemAFG.Web.Core/OrderingSystemAFG.Web.Core.csproj", "src/OrderingSystemAFG.Web.Core/"]
COPY ["src/OrderingSystemAFG.Application/OrderingSystemAFG.Application.csproj", "src/OrderingSystemAFG.Application/"]
COPY ["src/OrderingSystemAFG.Core/OrderingSystemAFG.Core.csproj", "src/OrderingSystemAFG.Core/"]
COPY ["src/OrderingSystemAFG.EntityFrameworkCore/OrderingSystemAFG.EntityFrameworkCore.csproj", "src/OrderingSystemAFG.EntityFrameworkCore/"]
WORKDIR "/src/src/OrderingSystemAFG.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/OrderingSystemAFG.Web.Host", "src/OrderingSystemAFG.Web.Host"]
COPY ["src/OrderingSystemAFG.Web.Core", "src/OrderingSystemAFG.Web.Core"]
COPY ["src/OrderingSystemAFG.Application", "src/OrderingSystemAFG.Application"]
COPY ["src/OrderingSystemAFG.Core", "src/OrderingSystemAFG.Core"]
COPY ["src/OrderingSystemAFG.EntityFrameworkCore", "src/OrderingSystemAFG.EntityFrameworkCore"]
WORKDIR "/src/src/OrderingSystemAFG.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "OrderingSystemAFG.Web.Host.dll"]
