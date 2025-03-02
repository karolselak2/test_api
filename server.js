const express = require('express');
const { stringify } = require('flatted');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/getTest/:param/test', (req, res) => {
    res.send('Hello getTest<br><br>' + stringify(req));
});

app.post('/postTest/:param/test', (req, res) => {
    res.send('Hello postTest<br><br>' + stringify(req));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
