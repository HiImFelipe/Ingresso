require('dotenv').config();

module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  autoLoadEntities: true,
  migrationsTableName: 'custom_migration_table',
  migrations: ['src/migrations/*.js'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  subscribers: ['dist/subscribers/**/*{.js,.ts}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
