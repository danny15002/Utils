const Logger = require('./index.js');
let logger;

try {
  logger = Logger.createLogger();
} catch (e) {
  console.log(e);
}

const fs = require('fs');
const wstream = fs.createWriteStream(__dirname + '/output.txt', { flags: 'a' });

logger = Logger.initLogger({
  // stream: wstream
});


logger.trace('trace');
logger.debug('debug');
logger.info('info');
logger.warning('warning');
logger.error('error');
logger.emergency('emergency');

// console.log(logger);
