require('dotenv').config({path: __dirname + '/.env'})
const express = require('express')
const bodyParser = require('body-parser');
const oauth = require('./oauth');
const auth_rest = require('./auth-rest');
const app = express()

app.use(bodyParser.json())
app.use(oauth.guard)
app.use('/auth', auth_rest);

app.use((err, req, res, next) => {
  console.log()
  res.status(err.status || 500);
  res.json({ err });
});

const port = 8080
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})
