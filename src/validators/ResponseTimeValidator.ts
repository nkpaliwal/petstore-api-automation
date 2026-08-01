import { Logger } from '../logger/Logger';
import { ApiPerformanceReport } from '../utils/ApiPerformanceReport';

export interface ApiExecution {

    method: string;
    endpoint: string;
    responseTime: number;
    threshold: number;
    status: 'PASS' | 'SLOW';

}

export class ResponseTimeValidator {

    private static readonly MAX_RESPONSE_TIME =
        Number(process.env.MAX_RESPONSE_TIME) || 2000;

    public static record(
        method: string,
        endpoint: string,
        responseTime: number
    ): void {

        const status: 'PASS' | 'SLOW' =
            responseTime > this.MAX_RESPONSE_TIME
                ? 'SLOW'
                : 'PASS';

        const execution: ApiExecution = {

            method,
            endpoint,
            responseTime,
            threshold: this.MAX_RESPONSE_TIME,
            status

        };

        ApiPerformanceReport.append(execution);

        if (status === 'SLOW') {

            Logger.warn(
                `[SLOW API] ${method} ${endpoint} | Response Time : ${responseTime} ms | Threshold : ${this.MAX_RESPONSE_TIME} ms`
            );

        }

    }

}