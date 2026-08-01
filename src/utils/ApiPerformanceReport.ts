import fs from 'fs';
import path from 'path';
import { ApiExecution } from '../validators/ResponseTimeValidator';

export class ApiPerformanceReport {

    private static readonly reportPath = path.join(
        process.cwd(),
        'logs',
        'api-response-times.csv'
    );

    public static clear(): void {

        fs.rmSync(this.reportPath, {
            force: true
        });

    }

    public static append(execution: ApiExecution): void {

        fs.mkdirSync(
            path.dirname(this.reportPath),
            { recursive: true }
        );

        if (!fs.existsSync(this.reportPath)) {

            fs.writeFileSync(

                this.reportPath,

                'Method,Endpoint,Response Time (ms),Threshold (ms),Status\n',

                'utf8'

            );

        }

        fs.appendFileSync(

            this.reportPath,

            `${execution.method},${execution.endpoint},${execution.responseTime},${execution.threshold},${execution.status}\n`,

            'utf8'

        );
    }

}