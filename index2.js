// import module from './module.js';
// console.log(module);

const express = require('express');
const app = express();

app.use(express.static(__dirname)); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.listen(3000, () => {
    console.log('App Available on http://localhost:3000');
});
//


