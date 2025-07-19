import util from 'minecraft-server-util';

export default async function handler(req, res) {
  const { host, port } = req.query;
  if (!host) return res.status(400).json({ error: 'Missing host parameter' });
  const p = parseInt(port) || 25565;
  try {
    const response = await util.status(host, p);
    res.status(200).json({
      online: true,
      version: response.version.name,
      players: {
        online: response.players.online,
        max: response.players.max,
        sample: response.players.sample || []
      },
      motd: response.motd.clean,
      favicon: !!response.favicon
    });
  } catch (error) {
    res.status(200).json({ online: false, error: error.message });
  }
}
