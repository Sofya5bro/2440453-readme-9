import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const ENV_USER_FILE_PATH = 'apps/user/user.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [],
      envFilePath: ENV_USER_FILE_PATH,
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class UserConfigModule {}
