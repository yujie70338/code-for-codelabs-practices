const functions = require('@google-cloud/functions-framework');


const BG_COLOR = process.env.BG_COLOR;
const K_REVISION = process.env.K_REVISION;


functions.http('helloHttp', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<html><body style="background-color:' + BG_COLOR + ';"' + '><div><p>' + 'Hello from ' + K_REVISION + ' using color ' + BG_COLOR + '</p></div></body>' + '</html>');
});
