export const dbConfig = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '1234',
  database: 'capstone_user',
  entities: [],
  synchronize: true,
  migrations: ['dist/migrations/*.js'],
};
