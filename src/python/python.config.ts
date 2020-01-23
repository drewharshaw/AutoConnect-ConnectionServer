import { Logger } from '@nestjs/common';
import { Options } from 'python-shell';

const logger = new Logger('Python Shell', true);

export const config: Options = {
  mode: 'json',
  pythonOptions: ['-u'],
  stderrParser: Log => Logger.verbose(Log), //route logging to standard error stream
};
