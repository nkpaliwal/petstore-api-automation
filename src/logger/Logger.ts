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

            format.printf(({ timestamp, level, message }) =>

                `[${timestamp}] [${level.toUpperCase()}] ${message}`

            )

        ),

        transports: [

            new transports.Console(),

            new transports.File({
                filename: path.join(
                    process.cwd(),
                    'logs',
                    'execution.log'
                )
            })

        ]

    });

    /**
     * Logs an informational message.
     */
    public static info(
        message: string
    ): void {

        this.logger.info(message);

    }

    /**
     * Logs a success message.
     */
    public static success(
        message: string
    ): void {

        this.logger.info(`[SUCCESS] ${message}`);

    }

    /**
     * Logs a warning message.
     */
    public static warn(
        message: string
    ): void {

        this.logger.warn(message);

    }

    /**
     * Logs an error message.
     */
    public static error(
        message: string
    ): void {

        this.logger.error(message);

    }

    /**
     * Logs a debug message.
     */
    public static debug(
        message: string
    ): void {

        this.logger.debug(message);

    }

    /**
     * Prints a separator line.
     */
    public static line(): void {

        this.logger.info(
            '============================================================'
        );

    }

}