import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const getTypeOrmConfig = (
  configService: ConfigService,
): DataSourceOptions => ({
  type: 'mysql',
  host: configService.get<string>('MYSQL_HOST'),
  port: configService.get<number>('MYSQL_PORT'),
  username: configService.get<string>('MYSQL_DB_USER'),
  password: configService.get<string>('MYSQL_DB_PASSWORD'),
  database: configService.get<string>('MYSQL_DB_NAME'),
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
  logging: false,
});

export const dataSource = new DataSource(getTypeOrmConfig(new ConfigService()));
