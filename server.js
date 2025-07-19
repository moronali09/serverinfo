const express = require('express');
const path = require('path');
const util = require('minecraft-server-util');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/api/status', async (req, res) => {
  const { host, port } = req.body;
  if (!host) return res.status(400).json({ error: 'Missing host' });
  const p = parseInt(port) || 25565;
  try {
    const response = await util.status(host, p);
    res.json({
      online: true,
      version: response.version.name,
      players: `${response.players.online}/${response.players.max}`
    });
  } catch (error) {
    res.json({ online: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
