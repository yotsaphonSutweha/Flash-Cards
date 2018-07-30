const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    const name = req.cookies.username;
    res.render('index', { name });
});

app.get('/hello', (req, res) => {
    res.render('hello');
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
})

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

app.listen(8080, () => {
    console.log("The app is running at localhost: 8080");
});