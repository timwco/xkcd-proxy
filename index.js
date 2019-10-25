const express = require("express");
const axios = require('axios');
const app = express();
const cors = require('cors');

const DOMAIN = 'https://xkcd.com'
const PATH = 'info.0.json'
const PORT = 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.listen(PORT, () => console.log('Server Running..'));

const webpage = `
  <h1>XKCD API Proxy</h1>
  <p>Documentation:</p>
  <ul>
    <li>Latest: <a href="https://xkcd.now.sh/?comic=latest"><pre>https://xkcd.now.sh/?comic=latest</pre></a></li>
    <li>Comic #303 (and so on...): <a href="https://xkcd.now.sh/?comic=303"><pre>https://xkcd.now.sh/?comic=303</pre></a></li>
  </ul>
`;

// Latest Comic
app.get("/", async (req, res) => {
  const comic = req.query.comic;
  let response = webpage;
  if (comic) {
    const path = (comic === 'latest') ? '' : `${comic}/`;
    const endpoint = `${DOMAIN}/${path}/${PATH}`;
    const xkcd = await axios(endpoint);
    response = xkcd.data;
  }
  res.send(response);
});
