import { DynamicModule, Module } from '@nestjs/common';
import mysql, { Connection } from 'mysql2/promise';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  console.log(mysql);
  return mysql.createConnection(config);
};

const connectionConfig = async (
  configService: ConfigService,
): Promise<MysqlConnectConfig> => {
  const configKeyList = ['host', 'user', 'password', 'database'];
  const configMap = new Map<string, string>([
    ['host', 'MYSQL_HOST'],
    ['user', 'MYSQL_USER'],
    ['password', 'MYSQL_PASSWORD'],
    ['database', 'MYSQL_DATABASE'],
  ]);
  const config: { [key: string]: string } = {};
  for (const key of configKeyList) {
    const configKey = configMap.get(key) as string;
    config[key] = (await configService.get(configKey)) as string;
  }
  return config as unknown as MysqlConnectConfig;
};

@Module({})
export class MysqlModule {
  static async forRootAsync(): Promise<DynamicModule> {
    return {
      module: MysqlModule,

      providers: [
        {
          provide: MYSQL_CONNECTION_CONFIG,
          inject: [ConfigService],
          useFactory: connectionConfig,
        },
        {
          provide: MYSQL_CONNECTION,
          inject: [MYSQL_CONNECTION_CONFIG],
          useFactory: async (config: MysqlConnectConfig) =>
            await createConnection(config),
        },
      ],
      imports: [ConfigModule],
      exports: [],
    };
  }
}
