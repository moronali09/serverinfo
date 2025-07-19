import { useState } from 'react';
import { useTheme } from 'next-themes';

export default function Home() {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('25565');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme();

  const checkStatus = async () => {
    if (!host) return;
    setLoading(true);
    const res = await fetch(`/api/status?host=${encodeURIComponent(host)}&port=${port}`);
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Minecraft Status</h1>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>
        <input
          className="w-full mb-2 p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="Server IP or Domain"
          value={host}
          onChange={(e) => setHost(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          placeholder="Port (default 25565)"
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
        <button
          className="w-full mb-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-400"
          onClick={checkStatus}
          disabled={loading}
        >
          {loading ? '⏳ Checking...' : 'Check Status'}
        </button>
        {result && (
          <div className="text-sm text-gray-900 dark:text-gray-100">
            {result.online ? (
              <>
                <p className="text-green-600 dark:text-green-400 font-semibold">✅ Online</p>
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
              </>
            ) : (
              <p className="text-red-600 dark:text-red-400">❌ {result.error || 'Offline'}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
