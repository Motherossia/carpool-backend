import * as dotenv from 'dotenv';
// import { ConfigService as NestConfigService } from '@nestjs/config';

export class ConfigService {
    private readonly envConfig: Record<string, string>;
    constructor() {
        const result = dotenv.config({ path: `.env.stage.${process.env.STAGE}` });
        if (result.error) {
            this.envConfig = process.env;
        } else {
            this.envConfig = result.parsed;
        }
    }

    public get(key: string): string {
        return this.envConfig[key];
    }

    public async getPortConfig() {
        return this.get('PORT');
    }

    public async getMongoConfig() {
        const uri =
            this.get('NODE_ENV') === 'development'
                ? this.get('MONGO_LOCAL_URL')
                : 'mongodb+srv://' + this.get('MONGO_USER') + ':' + this.get('MONGO_PASSWORD') + '@' + this.get('MONGO_HOST') + '/' + this.get('MONGO_DATABASE');
        return {
            uri,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }
}
