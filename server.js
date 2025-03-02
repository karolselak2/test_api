const express = require('express');
const stringify = require('safe-stable-stringify');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/getTest/:param/full', (req, res) => {
    const responseContent = formatJsonForResponse(stringify(req, null, 2), req);
    res.send(responseContent);
});

app.post('/postTest/:param/full', (req, res) => {
    const responseContent = formatJsonForResponse(stringify(req, null, 2), req);
    res.send(responseContent);
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

function formatJsonForResponse(jsonString, req) {
    if (req.accepts('json')) {
        return jsonString;
    } else {
        return formatJsonForHtml(jsonString);
    }
}

app.get('/getTest/:param', (req, res) => {
    const responseContent = formatJsonForResponse(stringifyFiltered(req, res), req);
    res.send(responseContent);
});

app.post('/postTest/:param', (req, res) => {
    const responseContent = formatJsonForResponse(stringifyFiltered(req, res), req);
    res.send(responseContent);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
