import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'examen2db',
  'postgres',
  process.env.VARIANTE_C_DB_PASSWORD,
  {
    host: '127.0.0.1',
    port: 55432,
    dialect: 'postgres',
    logging: false
  }
);

export default sequelize;
