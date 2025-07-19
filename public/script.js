document.getElementById('check').addEventListener('click', async () => {
  const hostInput = document.getElementById('host');
  const output = document.getElementById('output');
  const [host, port = 25565] = hostInput.value.split(':');

  output.textContent = '🔍 Checking server status...';

  try {
    const res = await fetch(`https://api.mcsrvstat.us/2/${host}:${port}`);
    const data = await res.json();

    if (!data.online) {
      output.textContent = `❌ Server is offline.`;
      return;
    }

    output.textContent =
      `✅ Server is online!\n` +
      `🧾 MOTD: ${data.motd.clean.join(' ')}\n` +
      `👥 Players: ${data.players.online}/${data.players.max}\n` +
      `📡 Version: ${data.version}\n` +
      `🌐 IP: ${data.ip}:${data.port}`;
  } catch (err) {
    output.textContent = '⚠️ Error fetching server info.';
  }
});
