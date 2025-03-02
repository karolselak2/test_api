const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/getTest/:param/test', (req, res) => {
    res.send('Hello getTest\n\n' + JSON.stringify(req.params));
});

app.post('/postTest/:param/test', (req, res) => {
    res.send('Hello postTest\n\n' + JSON.stringify(req.params));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
