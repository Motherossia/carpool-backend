import { Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
// import { ConfigModule as NestConfigModule } from '@nestjs/config';
@Global()
@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule {}
