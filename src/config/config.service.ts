import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { extname } from 'path';
import { EnvironmentEnum } from '../enums/environment.enum';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from "fs";
import { MulterModuleOptions } from '@nestjs/platform-express';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { diskStorage } from 'multer';

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

    static getInstance() {
        return new ConfigService();
    }

    private getJoiObjectModel() {
        return {
            SECRET: Joi.string().required(),
            NODE_ENV: Joi.string().required(),
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


    getMulterOptions = (): MulterModuleOptions => ({
        limits: {
            fileSize: Number('31457280'), // 30 MB (in bytes)(Default: Infinity)
            // preservePath: true, // Keep the full path of files instead of just the base name (Default: false)
        },
        fileFilter(req: any, file: any, callback: (error: (Error | null), acceptFile: any) => void): void {
            console.log(123);
            const fileInput = file.originalname;
            const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
            const errorExceptionText = `Unsupported file type ${file.originalname}. Please upload file with ${allowedExtensions} extensions only.`;
            if (allowedExtensions.exec(fileInput)) {
                callback(null, true);
            } else {
                callback(new ForbiddenException({
                    error: 'File Validation Failed',
                    message: errorExceptionText,
                }), false);
            }
        },

        storage: diskStorage({

            destination: (req: any, file: any, cb: any) => {
                console.log(123);

                const uploadPath = './uploads';
                // Create folder if doesn't exist
                if (!existsSync(uploadPath)) {
                    mkdirSync(uploadPath);
                }
                cb(null, uploadPath);
            },
            filename: (req: any, file: any, cb: any) => {
                console.log(123);

                // Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomStringGenerator()}${extname(file.originalname)}`);
            },
        }),
    });
}
