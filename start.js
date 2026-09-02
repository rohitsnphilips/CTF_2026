const express = require('express');
const path = require('path');
const app = express();

// Main landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the vulnerable JS file (will be "patched" later)
app.get('/js/vault-config.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'js', 'vault-config.js'));
});

// Serve robots.txt with flag
app.get('/robots.txt', (req, res) => {
  const apiKey = req.query.api_key;

  if (apiKey === 'acme_vault_sk_x7q2p9zt') {
    return res.type('text').send(
      'Almost there! You have uncovered the sensitive page hidden behind the vault key.\n' +
      'It looks encrypted... decode it to claim your flag:\n' +
      'ZmxhZ3tkMXdrNnR1eX0=\n'
    );
  }

  return res.type('text').sendFile(path.join(__dirname, 'public', 'robots.txt'));
});

// API endpoint (for realism)
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', version: '2.1.0' });
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Visit http://localhost:${PORT} and manually save to archive.org`);
});