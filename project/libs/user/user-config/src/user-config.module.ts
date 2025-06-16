import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import  applicationConfig from './configurations/app.config';
import dbConfig from './configurations/mongo.config';


const ENV_USER_FILE_PATH = 'apps/user/user.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, dbConfig],
      envFilePath: ENV_USER_FILE_PATH,
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserConfigModule {}
