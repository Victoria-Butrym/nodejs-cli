const { PORT } = require('./common/config');
const app = require('./app');

// throw new Error('CROSSCHECK ERROR');
// Promise.reject(new Error('CROSSCHECK PROMISE ERROR'));

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
