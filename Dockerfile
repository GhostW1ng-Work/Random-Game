# Use the official .NET SDK image to build and publish the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Use the .NET SDK to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["RandomGame.csproj", "./"]
RUN dotnet restore "./RandomGame.csproj"

COPY . .
RUN dotnet publish "./RandomGame.csproj" -c Release -o /app/publish

# Final runtime image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "RandomGame.dll"]
