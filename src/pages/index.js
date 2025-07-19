import { useState } from 'react';
export default function Home() {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('25565');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkStatus = async () => {
    if (!host) return;
    setLoading(true);
    const res = await fetch(`/api/status?host=${encodeURIComponent(host)}&port=${port}`);
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">🌐 Minecraft Server Status</h1>
        <input
          className="w-full mb-2 p-2 border rounded"
          placeholder="Server IP or Domain"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Port (default 25565)"
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          onClick={checkStatus}
          disabled={loading}
        >
          {loading ? '⏳ Checking...' : 'Check Status'}
        </button>
        {result && (
          <div className="mt-4 text-sm">
            {result.online ? (
              <div>
                <p className="text-green-600 font-semibold">✅ Server Online</p>
                <p><strong>Version:</strong> {result.version}</p>
                <p><strong>Players:</strong> {result.players.online}/{result.players.max}</p>
                <p><strong>MOTD:</strong> {result.motd.join(' ')}</p>
                {result.players.sample.length > 0 && (
                  <div>
                    <p><strong>Online Players:</strong></p>
                    <ul className="list-disc ml-5">
                      {result.players.sample.map((p, i) => <li key={i}>{p.name}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-red-600">❌ Offline or Error: {result.error}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
