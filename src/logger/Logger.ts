import { createLogger, format, transports } from 'winston';
import { Environment } from '../config/Environment';
import path from 'path';

export class Logger {

    private static logger = createLogger({

        level: Environment.getLogLevel() || 'info',

        format: format.combine(

            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),

            format.printf(({ timestamp, level, message }) => {

                return `[${timestamp}] [${level.toUpperCase()}] ${message}`;

            })

        ),

        transports: [

            new transports.Console(),

            new transports.File({
                filename: path.join(process.cwd(), 'logs', 'execution.log')
            })

        ]

    });

    public static info(message: string): void {

        this.logger.info(message);

    }

    public static success(message: string): void {

        this.logger.info(`[SUCCESS] ${message}`);

    }

    public static warn(message: string): void {

        this.logger.warn(message);

    }

    public static error(message: string): void {

        this.logger.error(message);

    }

    public static debug(message: string): void {

        this.logger.debug(message);

    }

    public static line(): void {

        this.logger.info('============================================================');

    }

}