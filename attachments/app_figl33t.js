const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
    }
);

app.post('/figlet', (req, res) => {
    let cmd = 'timeout 1 figlet \'' + req.body.text + '\'';
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.log(stderr);
            res.send('Error');
        } else {
            res.send(stdout);
        }
    });
});

app.listen(3000, () => {
    console.log('figl33t listening on port 3000!');
});
