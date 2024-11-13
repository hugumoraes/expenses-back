import 'reflect-metadata';

/* ---------- External ---------- */
import { DataSource } from 'typeorm';

/* ---------- Config ---------- */
import { db_host, db_name, db_password, db_port, db_user } from '../config';

/* ---------- Models ---------- */
import { Category } from '../../models/category/category.entity';
import { Transaction } from '../../models/transaction/transaction.entity';
import { User } from '../../models/user/user.entity';

/* ---------- Utils ---------- */
import { logger } from '../utils/logs';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: db_host,
  port: db_port,
  username: db_user,
  password: db_password,
  database: db_name,
  entities: [User, Transaction, Category],
  synchronize: false,
  logging: false,
});

PostgresDataSource.initialize()
  .then(() => {
    return logger.info('Data Source has been initialized!');
  })
  .catch(err => {
    logger.error(`Error during Data Source initialization: `);
    logger.error(err);
  });
