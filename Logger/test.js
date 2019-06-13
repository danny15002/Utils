const Logger = require('./index.js');
let logger;

try {
  logger = Logger.getLogger();
} catch (e) {
  console.log(e);
}

logger = Logger.initLogger();
logger = Logger.initLogger();

logger.debug('debug');
logger.info('info');
logger.warning('warning');
logger.error('error');
logger.emergency('emergency');

console.log(logger);
