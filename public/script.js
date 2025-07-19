const checkBtn = document.getElementById('check');
const hostInput = document.getElementById('host');
const output = document.getElementById('output');

checkBtn.addEventListener('click', async () => {
  const value = hostInput.value.trim();
  if (!value) return;
  const [host, port] = value.split(':');
  output.textContent = 'Querying...';
  try {
    const res = await fetch('/api/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ host, port })
    });
    const data = await res.json();
    if (data.online) {
          </div>
        )}
      </div>
    </div>
  );
}
