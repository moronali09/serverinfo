import axios from "axios";

const CACHE = {};
const TTL = 1000 * 60 * 4;

export default async function handler(req, res) {
  const { server } = req.query;
  if (!server || typeof server !== "string") {
    return res.status(400).json({ error: "Usage: ?server=host:port" });
  }

  const key = server.toLowerCase();
  const cached = CACHE[key];
  if (cached && Date.now() - cached.ts < TTL) {
    return res.status(200).json({ cached: true, ...cached.data });
  }

  try {

    const isBedrock = key.includes(":19132");
    const apiUrl = isBedrock
      ? `https://api.mcsrvstat.us/3/bedrock/${encodeURIComponent(key)}`
      : `https://api.mcsrvstat.us/3/${encodeURIComponent(key)}`;

    const { data } = await axios.get(apiUrl, {
      headers: { "User-Agent": "serverinfo-vercel/1.0" },
    });

    CACHE[key] = { ts: Date.now(), data };
    return res.json({ cached: false, ...data });
  } catch (err) {
    return res.status(502).json({ error: "Failed to fetch", details: err.message });
  }
}
