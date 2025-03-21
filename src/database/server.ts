import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  database: 'investigation',
  dialect: 'postgres',
  port: 5432,
  username: 'postgres',
  password: '4x24oqwpH',
  models: [__dirname + '/models'],
});

export const initDB = async () => {
    try {
      await sequelize.authenticate();
      await sequelize.sync(); 
      console.log("Sequelize was initialized");
    } catch (error) {
      console.log("Sequelize ERROR (initDB)", error);
      process.exit();
    }
  };