import { Injectable, Logger } from '@nestjs/common';
import { PythonShell } from 'python-shell';
import { config } from './python.config';
import { Observable, fromEvent } from 'rxjs';

@Injectable()
export class PythonService {
  private readonly logger = new Logger(PythonService.name, true);
  private shell: PythonShell;

  constructor() {
    this.shell = new PythonShell(
      `${__dirname}/Connection-Algorithm.py`,
      config,
    );
    this.startup();
  }

  private startup() {
    this.logger.log('Python Startup');
  }

  public get response(): Observable<any> {
    return fromEvent(this.shell, 'message');
  }

  public process(data: any) {
    console.log(`Python Service - Process Called! AlphaId = ${data}`);
    this.shell.send(data);
  }
}
