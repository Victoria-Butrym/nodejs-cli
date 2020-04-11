const { PORT } = require('./common/config');
const app = require('./app');

// throw new Error('REJECT');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
