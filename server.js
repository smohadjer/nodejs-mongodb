import express from 'express';
import fetchData from '/api/api.js';

const app = express();
const port = 8000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

app.get('/list.html', async (req, res) => {
  fetchData(req, res);
});


