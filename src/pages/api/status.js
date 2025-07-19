import util from 'minecraft-server-util';

export default async function handler(req, res) {
  const { host, port } = req.query;
  if (!host) return res.status(400).json({ error: 'Missing host parameter' });
  const p = parseInt(port) || 25565;

  try {
    // Try Java status
    const response = await util.status(host, p);
    return res.status(200).json({
      online: true,
      version: response.version.name,
      players: { online: response.players.online, max: response.players.max, sample: response.players.sample || [] },
      motd: response.motd.clean,
      favicon: !!response.favicon
    });
  } catch (statusError) {
    try {
      // Fallback to ping (only checks online/offline)
      await util.ping(host, p);
      return res.status(200).json({ online: true, version: null, players: { online: 0, max: 0, sample: [] }, motd: [], favicon: false });
    } catch (pingError) {
      return res.status(200).json({ online: false, error: pingError.message });
    }
  }
}
