// black: 30
// dark red: 31
// dark green: 32
// white: 33
// dark blue: 34
//              35
// dark teal: 36
// gray: 37

// highlight black: 40
// highlight dark red: 41
// highlight dark green: 42
// highlight white: 43
// highlight dark blue: 44
// highlight              45
// highlight dark teal: 46
// highlight gray: 47

// gray: 90
// bright red: 91
// bright green: 92
// bright yellow: 93
// bright blue: 94
// bright magenta 95
// bright teal: 96
// bright gray: 97

// highlight gray: 100
// highlight bright red: 101
// highlight bright green: 102
// highlight bright yellow: 103
// highlight bright blue: 104
// highlight bright magenta 105
// highlight bright teal: 106
// highlight white: 107

const fmt = require('util').format;

const LEVELS = {
  EMERGENCY: 0, // color windows: 101
  ERROR: 1, // color windows: 91
  WARNING: 2, // color windows 93
  INFO: 3, // color windows 96
  DEBUG: 4, // color windows 92
  TRACE: 5 // color windows 95
};

const colorReset = '\x1b[0m';

/** defines the Logger class */
class Logger {

  /**
   * @name constructor
   * @description instantiate logger
   * @param {Object} options - {
       level: {String} - level of logs to output
       stream: {WritableStream} - the stream to send the logs to
       colorize: {Boolean} - flag indicating to colorize logs
     }
   */
  constructor(options = {}) {
    const level = options.level || 'DEBUG';
    this.level = LEVELS[level.toUpperCase()];
    this.stream = options.stream || process.stdout;
    // TODO: auto detect if terminal supports color

    if (options.colorize !== undefined) this.colorize = options.colorize;
    else this.colorize = true;

    if (options.stream) this.colorize = false;
  }

  /**
   * @name trace
   * @description
   * @param {Object} args
   */
  trace(...args) {
    const colorCode = 95;
    log(this, 5, colorCode, args);
  }

  /**
   * @name debug
   * @description
   * @param {Object} args
   */
  debug(...args) {
    const colorCode = 92;
    log(this, 4, colorCode, args);
  }

  /**
   * @name info
   * @description
   * @param {Object} args
   */
  info(...args) {
    const colorCode = 96;
    log(this, 3, colorCode, args);
  }

  /**
   * @name warning
   * @description
   * @param {Object} args
   */
  warning(...args) {
    const colorCode = 93;
    log(this, 2, colorCode, args);
  }

  /**
   * @name error
   * @description
   * @param {Object} args
   */
  error(...args) {
    const colorCode = 91;
    log(this, 1, colorCode, args);
  }

  /**
   * @name emergency
   * @description
   * @param {Object} args
   */
  emergency(...args) {
    const colorCode = 41;
    log(this, 0, colorCode, args);
  }

  /**
   * @name logReturn
   * @description takes in a parameter, logs it and returns it
   * @param {any} parameter
   * @return {any}
   */
  logReturn(result) {
    const clone = JSON.parse(JSON.stringify(result));
    log(this, 4, 92, [ clone ]);
    return result;
  }

  /**
   * @name logPadding
   * @description pads new lines in the logs
   * @param {Number} n - number of lines to pad
   */
  logPadding(n) {
    for (let i = 0; i < n; i++) console.log('\n');
  }
}

const log = (self, level, colorCode, args) => {
  if (level <= self.level) {
    const dateString = (new Date()).toLocaleString();
    const colorSet = '\x1b[' + colorCode + 'm';
    const label = '[' + dateString + '] -> ';
    args.unshift(label);

    if (self.colorize) {
      args.unshift(colorSet);
      args.push(colorReset);
    }

    const msg = fmt(...args);
    self.stream.write(msg + '\n');
  }
};

let logger;

module.exports = {
  initLogger: (options) => {
    if (logger) {
      logger.emergency(`
        THIS IS ONLY A WARNING.
        LOGGER HAS ALREADY BEEN INITIALIZED.
        RETURNING LOGGER SINGLETON.
      `);

      return logger;
    }

    const loggerOptions = options || {
      level: process.env.LOG_LEVEL || 'DEBUG'
    };

    logger = new Logger(loggerOptions);
    return logger;
  },

  createLogger: options => {
    const loggerOptions = options || {
      level: process.env.LOG_LEVEL || 'DEBUG'
    };

    logger = new Logger(loggerOptions);
    return logger;
  },

  getLogger: () => {
    if (!logger) throw new Error('Must first initialize logger.');
    return logger;
  }
}
