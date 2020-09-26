import winston from 'winston';

/**
 * SAMPLE USAGE:
 * import Logger from '../../libs/logger'; // import logger as dependency
 *
 * const logger = new Logger(context); // init inside of your handler
 * logger.log('debug', `sample debug message: ${fooVariable}`); // debug ignored by CloudWatch logs
 * logger.log('info', `sample info message`);
 * logger.log('warn', `sample warning message`);
 *
 * ERRORS USAGE:
 * const err = new Error('your error message: ${fooVariable}');
 * logger.log('error', err.message);
 * throw new Error(errMsg);
 *
 * NOTE: there is no need to pass err.stack,
 * the stack trace is output automatically by throwing it!
 */

export default class Logger {
  constructor() {
    const isLocal = process.env.IS_LOCAL;
    const isOffline = process.env.IS_OFFLINE;
    let level;
    let config;

    if (isLocal || isOffline) {
      // Log output in CLI
      level = 'debug';
      config = {
        format: winston.format.combine(
          winston.format.colorize({
            debug: 'cyan', info: 'green', warn: 'yellow', error: 'red'
          }),
          winston.format.label({
            label: '[logger]'
          }),
          winston.format.printf(
            info => `${info.label} ${info.level}: ${info.message}`
          )
        )
      };
    } else {
      // Log output sent to CloudWatch
      level = 'info';
      config = {
        format: winston.format.combine(
          winston.format.printf(
            info => `${info.level}: ${info.message}`
          )
        )
      };
    }

    const logger = winston.createLogger({
      level,
      transports: [new (winston.transports.Console)(config)]
    });

    return logger;
  }
}
