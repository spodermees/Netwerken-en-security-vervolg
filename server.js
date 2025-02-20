const express = require('express');
const path = require('path');

const app = express();

// Statische bestanden serveren (HTML, JS, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Standaardroute om index.html te laden
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000; // Gebruik poort 3000 i.p.v. 80 voor dev
app.listen(PORT, () => {
    console.log(`🚀 Server draait op http://localhost:${PORT}`);
});