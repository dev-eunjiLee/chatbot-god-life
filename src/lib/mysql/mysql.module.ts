import { DynamicModule, Global, Module } from '@nestjs/common';
import mysql, { Connection } from 'mysql2/promise';

export interface MysqlConnectConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

export const MYSQL_CONNECTION_CONFIG = 'MYSQL_CONNECTION_CONFIG';
export const MYSQL_CONNECTION = 'MYSQL_CONNECTION';

export const createConnection = async (
  config: MysqlConnectConfig,
): Promise<Connection> => {
  return mysql.createConnection(config);
};

@Module({})
export class MysqlModule {
  static forRoot(config: MysqlConnectConfig): DynamicModule {
    return {
      module: MysqlModule,
      providers: [
        {
          provide: MYSQL_CONNECTION_CONFIG,
          useValue: config,
        },
        {
          provide: MYSQL_CONNECTION,
          inject: [MYSQL_CONNECTION_CONFIG],
          useFactory: async (config: MysqlConnectConfig) =>
            await createConnection(config),
        },
      ],
      imports: [],
      exports: [],
    };
  }
}
