import { Module } from '@nestjs/common';
import { ReadmeUserModule } from '@project/readme-user';
import { AuthenticationModule } from '@project/authentication';
import { UserConfigModule } from '@project/user-config';

@Module({
  imports: [
    ReadmeUserModule,
    AuthenticationModule,
    UserConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
