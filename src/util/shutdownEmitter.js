const logger = require('../logger')

const shutdownEmitter = (event, message) => {
  logger.error(`App stopped, ${message}`)
  process.emit(event, message);
};

module.exports = shutdownEmitter;