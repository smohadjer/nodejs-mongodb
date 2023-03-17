import express from 'express';
import fetch from './api/fetch.js';

const app = express();

app.use(express.static('public'));

const port = 8000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

app.get('/api/fetch.js', (req, res) => {
  fetch(req, res);
});
