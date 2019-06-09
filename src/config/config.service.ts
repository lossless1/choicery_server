import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { EnvironmentEnum } from '../enums/environment.enum';
import { Injectable } from '@nestjs/common';

export interface EnvConfigInterface {
    [prop: string]: string;
}

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfigInterface;

    constructor() {
        let config, envPath;
        if (process.env.NODE_ENV === EnvironmentEnum.PRODUCTION) {
            envPath = path.join(__dirname, '..', '..', '.env.production');
        } else {
            envPath = path.join(__dirname, '..', '..', '.env');
        }
        config = dotenv.config({path: envPath});
        this.envConfig = this.validateEnvironment(config.parsed);
    }

    static getInstance(){
        return new ConfigService();
    }

    private getJoiObjectModel() {
        return {
            SECRET: Joi.string(),
        };
    }

    /**
     * Ensures all needed variables are set, and returns the validated JavaScript object
     * including the applied default values.
     */
    private validateEnvironment(envConfig: EnvConfigInterface): EnvConfigInterface {

        const envVarsSchema: Joi.ObjectSchema = Joi.object(this.getJoiObjectModel());

        const {error, value: validatedEnvConfig} = Joi.validate(
            envConfig,
            envVarsSchema,
        );
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
