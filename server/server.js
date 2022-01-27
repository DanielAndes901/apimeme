const path = require('path');
const express = require('express');
const compression = require('compression');

const CONTEXT = `/${process.env.CONTEXT || 'aipoma'}`;
const PORT = process.env.PORT || 9000;

const app = express();

app.use(compression());
app.use(
  CONTEXT,
  express.static(
    path.resolve(__dirname, '../dist/browser')
  )
);
app.use(
  '/',
  express.static(
    path.resolve(__dirname, '../dist/browser')
  )
);
app.listen(PORT, () =>
  console.log(`App running on http://localhost:${PORT}`)
);
