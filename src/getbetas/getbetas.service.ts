import { Injectable, Logger } from '@nestjs/common';
import { PythonService } from 'src/python/python.service';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class GetbetasService {
  private priorityMatrix: object;

  private queue: any[] = [];
  private ready: boolean = false;
  private output: Subject<any> = new Subject<any>();

  constructor(private python: PythonService) {
    this.python.response.subscribe(data => {
      if (data.status === 'ready') {
        this.ready = true;
        this.process();
      } else {
        this.output.next(data);
      }
    });
  }

  private process(): void {
    if (this.queue.length != 0) {
      this.ready = false;
      this.python.process(this.queue.shift());
    }
  }

  public get Output(): Observable<any> {
    return this.output;
  }

  public input(inputData: any) {
    console.log(`Adding Request Data to Que`);
    this.queue.push(inputData);

    if (this.ready) {
      this.process();
    }
  }

  async getBetas(autoId: number) {
    console.log(`Starting getBetas function for Alpha car ${autoId}`);

    this.input(autoId);

    // TODO: Call Connection Algorithm

    //PythonShell.defaultOptions = { scriptPath: './src/python/' };
    //let connectionAlg = new PythonShell('Connection-Algorithm.py', config);

    /*
    console.log('Starting Test 1: ');
    PythonShell.runString(
      'import sys print("dsad") sys.stdout.flush()',
      null,
      function(err) {
        if (err) throw err;
        console.log('finished');
      },
    );
    */

    /*

    PythonShell.run('./getbetas/Connection-Algorithm.py', null, function(err) {
      if (err) throw err;
      // results is an array consisting of messages collected during execution
      console.log('finished');
    });
    */

    //Create child process
    //var spawn = require('child_process').spawn;

    //const process = spawn('python', ['./Connection-Algorithm.py']);

    // util.log('readingin');
    /*
    process.stdout.on('data', function(data) {
      `Python Script Output: ${data.toString()}`;
    });
    */

    return `PriorityMatrix: ${process}`;
  }
}
