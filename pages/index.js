import { useState } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "../styles/Index.module.css";

export default function Home() {
  const [server, setServer] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  async function runCmd(e) {
    e.preventDefault();
    if (!server.trim()) return;

    setLoading(true);
    setOutput(`minecraft@status:web~$ check ${server}\n`);

    try {
      const { data } = await axios.get("/api/status", { params: { server } });
      const prefix = data.online ? "✅ Online" : "❌ Offline";

      let extra = "";
      if (data.players) {
        extra += `Players: ${data.players.online}/${data.players.max}\n`;
      }
      if (data.version) {
        extra += `Version: ${data.version}\n`;
      }
      if (data.motd && data.motd.clean) {
        extra += `MOTD: ${data.motd.clean.join("\n")}\n`;
      }
      if (data.cached) extra += "(cached)\n";

      setOutput((o) => o + `Server: ${server}\n${prefix}\n${extra}`);
    } catch (err) {
      setOutput((o) => o + `Error: ${err.response?.data?.error || err.message}\n`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>Serverinfo CLI</title>
        <meta name="description" content="Minecraft Server Status CLI" />
      </Head>

      <pre className={styles.cliOutput}>{output || "minecraft@status:web~$"}</pre>

      <form onSubmit={runCmd}>
        <input
          placeholder="e.g. play.hypixel.net"
          value={server}
          onChange={(e) => setServer(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Check"}
        </button>
      </form>
    </div>
  );
}
