# Ingresso - How to make a ticket website scalable

Project inspired by [Fabio Akita's Video](https://www.youtube.com/watch?v=0TMr8rsmU-k&ab_channel=FabioAkita)

## Project's Ideas

- To make this project, I didn't want to take so long in order to create a robust and functional back-end, so I chose a NodeJS Framework called [NestJS](https://nestjs.com/)
- The tests' logic and inspiration were taken from [Angelo Luz's video](https://www.youtube.com/watch?v=T47Djfzd9bU&ab_channel=AngeloLuz)

## Running the project in your machine

### Requirements

- MySQL should be installed in your machine in order to run it out-of-the-box. **If you want to try another database, you got to change app.module.ts on project's root**;
- NodeJS v17 or higher is recommended;
- The project was built using Yarn instead of NPM, which is also recommended.

### Steps

1 - Create a .env file on project's root, it's format should be like this

```
MYSQL_USERNAME = 'foo'
MYSQL_PASSWORD = 'bar'
MYSQL_PORT =
MYSQL_DB_NAME = 'foo'
MYSQL_HOST = 'bar'

JWT_SECRET = 'foo'
```

2 - run `yarn install` to install the project's dependencies

3 - run `yarn start` to run the project normally, or `yarn start:dev` to run the project in watch mode (in case you will modify the code)
