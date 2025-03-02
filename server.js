const express = require('express');
const stringify = require('safe-stable-stringify');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/getTest/:param/full', (req, res) => {
    res.send('Hello getTest<br><br>' + formatJsonForHtml(stringify(req, null, 2)));
});

app.post('/postTest/:param/full', (req, res) => {
    res.send('Hello postTest<br><br>' + formatJsonForHtml(stringify(req, null, 2)));
});

function stringifyFiltered(req, res) {
    const filteredObj = {
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
        httpVersion: req.httpVersion,
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        route: req.route ? req.route.path : 'N/A',
        statusCode: res.statusCode
    };

    return stringify(filteredObj, null, 2);
}

function formatJsonForHtml(jsonString) {
    return `<pre>${jsonString.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
}

app.get('/getTest/:param', (req, res) => {
    res.send(`Hello getTest<br><br>${formatJsonForHtml(stringifyFiltered(req, res))}`);
});

app.post('/postTest/:param', (req, res) => {
    res.send(`Hello postTest<br><br>${formatJsonForHtml(stringifyFiltered(req, res))}`);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
