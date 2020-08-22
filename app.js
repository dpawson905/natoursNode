const debug = require('debug')('natours:app');
const morgan = require('morgan');
const express = require('express');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

const dev = process.env.NODE_ENV === 'development' || 'development';
// Middleware
if (dev) {
  app.use(morgan('common'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requsetTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Unhandled route middleware
app.all('*', (req, res, next) => {
  debug(`Cant find ${req.originalUrl} on this server`);
  res.status(404).json({
    status: 'fail',
    message: `Cant find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
