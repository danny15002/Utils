const Logger = require('./index.js');
let logger;

try {
  logger = Logger.getLogger();
} catch (e) {
  console.log(e);
}

const fs = require('fs');
const wstream = fs.createWriteStream(__dirname + '/output.txt', { flags: 'a' });

logger = Logger.initLogger({
  stream: wstream
});

logger = Logger.initLogger();

logger.debug('debug');
logger.info('info');
logger.warning('warning');
logger.error('error');
logger.emergency('emergency');

console.log(logger);
