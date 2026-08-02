import { FullConfig, Reporter, Suite, FullResult } from '@playwright/test/reporter';
import { ApiPerformanceReport } from './ApiPerformanceReport';
import { Environment } from '../config/Environment';

export default class ApiPerformanceReporter implements Reporter {

    private startTime = 0;

    onBegin(config: FullConfig, suite: Suite): void {

        this.startTime = Date.now();

        ApiPerformanceReport.clear();

        console.log('\n============================================================');
        console.log('               API AUTOMATION EXECUTION STARTED');
        console.log('============================================================');
        console.log(`Environment      : ${Environment.getEnvName()}`);
        console.log(`Base URL         : ${Environment.getBaseUrl()}`);
        console.log(`Workers          : ${config.workers}`);
        console.log(`Total Tests      : ${suite.allTests().length}`);
        console.log('============================================================\n');

    }

    onEnd(result: FullResult): void {

        const executionTime = ((Date.now() - this.startTime) / 1000).toFixed(2);

        console.log('\n============================================================');
        console.log('              API AUTOMATION EXECUTION SUMMARY');
        console.log('============================================================');
        console.log(`Environment      : ${Environment.getEnvName() ?? 'dev'}`);
        console.log(`Status           : ${result.status.toUpperCase()}`);
        console.log(`Duration         : ${executionTime} seconds`);
        console.log(`HTML Report      : playwright-report/index.html`);
        console.log(`Performance CSV  : logs/api-response-times.csv`);
        console.log(`Execution Log    : logs/execution.log`);
        console.log('============================================================\n');

    }

}