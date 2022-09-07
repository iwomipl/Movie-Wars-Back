const yourFrontendDomain = 'http://localhost:3000';

export const config = {
    dbHost: 'your-db-host',
    dbUser: 'your-db-user',
    dbPassword: 'your-password',
    dbDatabase: 'your_db_name',
    servPort: 3001,
    servHost: 'your-backend-server-host',//on replit it should be '0.0.0.0'
    omdbAPIURL: 'http://www.omdbapi.com/?apikey=',
    omdbApiKey: 'yourAPIKeyFromOMDBAPIWebsite',
    yourFrontendDomain: yourFrontendDomain, // for localhost and React this should be good
    corsOrigin: ['https://websiteFromWhichYouAreBuildingMovieStats', yourFrontendDomain],
    serverToApiUrlPrefix: '',//default settings, leave empty string, if your api has prefix path, name it as "/name-of-folder/
}