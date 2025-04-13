import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTypeOrmConfig } from './config/typeorm.config';

const environment = process.env.NODE_ENV || 'development';

export const configModule = ConfigModule.forRoot({
  envFilePath: `.env.${environment}`,
  isGlobal: true,
});

export const typeOrmModuleOptions = (configService: ConfigService) =>
  getTypeOrmConfig(configService);
