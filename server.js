const dotenv = require('dotenv');
const debug = require('debug')('natours:server');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  debug('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  debug(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DB_URL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    debug('Connected to DB');
  });

// Start Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  debug(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  debug('UNHANDLED REJECTION! 💥 Shutting down...');
  debug(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
