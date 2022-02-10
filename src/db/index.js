const shutdownEmitter = require("../util/shutdownEmitter");
const logger = require('../logger')
const connectionString = 'postgres://postgres:postgres@postgres:5432'

const startDb = async function startDb(ctx) {
  logger.debug(`*** In Start DB.`);
  logger.info(`Here ctx ${ctx.db.Pool.name}`);
  const pool = await new ctx.db.Pool({
    connectionString,
  });
  
  pool.on('error', err => {
    logger.error(`Unexpected error on pool db client: ${err.message}.`);
    // eslint-disable-next-line no-use-before-define
    onDbFailure(err);
  });
  
  await checkConnection(pool);
  
  await initDb(pool);
  
  ctx.db.pool = pool;
};

const stopRelicDb = async function stopDb(ctx) {
  logger.debug(`*** In Stop DB!`);
  
  if (ctx.db.pool) {
    try {
      await ctx.db.pool.end();
    } catch (e) {
      logger.error(`*** In Stop DB: Error closing pool!`);
    }
    ctx.db.pool = null;
  }
};


const startRelicDb = async function startRelicDb(ctx) {
  return startDb(ctx);
};

const onDbFailure = async function onDBFailure(err) {
  logger.debug(`*** DB Failure!`);
  
  shutdownEmitter('SIGQUIT', `DB connection failed. ${err}`);
};

const checkConnection = async function checkConnection(pool) {
  const query = {
    name: 'Check_Connection_Request',
    text: 'SELECT NOW()',
    values: [],
    rowMode: 'array',
  };
  
  try {
    await pool.query(query);
    return true;
  } catch (err) {
    throw new Error(`Error while checking connection: ${err.message}`);
  }
};

const initDb = async function initDb(pool) {
  const query = {
    name: 'Create table',
    text: 'CREATE TABLE IF NOT EXISTS relic_msg(' +
      'msg_pid SERIAL PRIMARY KEY, ' +
      'id TEXT, name TEXT, link TEXT, ' +
      'event_type TEXT, ' +
      'incident_id BIGINT,' +
      'details TEXT,' +
      'timestamp TIMESTAMP,' +
      'owner TEXT,' +
      'policy_name TEXT,' +
      'incident_url TEXT)',
    values: [],
    rowMode: 'array',
  };
  
  try {
    await pool.query(query);
  } catch (err) {
    throw new Error(`Error while init DB: ${err.message}`);
  }
}

module.exports = { startRelicDb, stopRelicDb };