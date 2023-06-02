Steps to Install

Make sure you have docker installed on your machine.
Make sure you have no error while running `docker` and `docker-compose` in your terminal
Make sure you don't have any process on `3000` and `8000` port to avoid conflict port

Run the project

```
docker-compose up
```

Wait for the `client` and `server` install dependencies and serve:

Server:
```
server    | [Nest] 63  - 06/02/2023, 8:50:30 AM     LOG [NestFactory] Starting Nest application...
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [InstanceLoader] SequelizeModule dependencies initialized +833ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [InstanceLoader] PassportModule dependencies initialized +1ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [InstanceLoader] SequelizeCoreModule dependencies initialized +0ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [InstanceLoader] JwtModule dependencies initialized +0ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [InstanceLoader] AppModule dependencies initialized +1ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [InstanceLoader] SequelizeModule dependencies initialized +0ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [InstanceLoader] SequelizeModule dependencies initialized +0ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [InstanceLoader] UsersModule dependencies initialized +2ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [InstanceLoader] AuthModule dependencies initialized +0ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [InstanceLoader] MoviesModule dependencies initialized +0ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [RoutesResolver] AppController {/}: +592ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [RouterExplorer] Mapped {/, GET} route +1ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [RoutesResolver] UsersController {/users}: +0ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [RoutesResolver] MoviesController {/movies}: +0ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [RouterExplorer] Mapped {/movies, POST} route +1ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [RouterExplorer] Mapped {/movies, GET} route +1ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [RouterExplorer] Mapped {/movies/:id, GET} route +0ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [RouterExplorer] Mapped {/movies/:id, DELETE} route +1ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [RoutesResolver] AuthController {/auth}: +0ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [RouterExplorer] Mapped {/auth/sign-in, POST} route +0ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [RouterExplorer] Mapped {/auth/sign-up, POST} route +1ms
server    | [Nest] 63  - 06/02/2023, 8:50:31 AM     LOG [NestApplication] Nest application successfully started +2ms
```

Client:
```
client    | You can now view client in the browser.
client    | 
client    |   Local:            http://localhost:8000
client    |   On Your Network:  http://172.23.0.3:8000
client    | 
client    | Note that the development build is not optimized.
client    | To create a production build, use yarn build.
client    | 
client    | webpack compiled successfully
client    | No issues found.
```

Then we will need to migrate database by:
```
docker-compose exec server yarn sequelize db:migrate --config src/databases/config.js
```

Then we're good to go:

Frontend App: http://localhost:8000
Backend App Swagger: http://localhost:3000/swagger

To run test:

Client:
```
docker-compose exec client yarn test
```
Server:
```
docker-compose exec server yarn test
```
