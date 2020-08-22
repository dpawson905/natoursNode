const dotenv = require('dotenv');
const debug = require('debug')('natours:server');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });

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
app.listen(port, () => {
  debug(`App running on port ${port}`);
});
