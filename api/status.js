const util = require('minecraft-server-util');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  const { host, port } = req.body;
  if (!host) return res.status(400).json({ error: 'Missing host' });
  const p = parseInt(port) || 25565;
  try {
    const response = await util.status(host, p);
    return res.json({
      online: true,
      version: response.version.name,
      players: `${response.players.online}/${response.players.max}`
    });
  } catch (e) {
    return res.json({ online: false, error: e.message });
  }
};
