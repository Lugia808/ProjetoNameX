const express = require('express');
const app = express();
const admin = require('./routes/admin')
const handlebars = require('express-handlebars')
const path = require('path');
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
require('./config/auth')(passport)
const flash = require('connect-flash');

app.use(flash());

const bcrypt = require('bcryptjs');




//Config
//handlebars
    app.engine("handlebars", handlebars.engine({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
//Midleware
//Session & passport
    app.use(session({
        secret: 'secret_key',
        resave: false,
        saveUninitialized: false,
    }));

    app.use(passport.initialize())
    app.use(passport.session())
//Public
    app.use(express.static(path.join(__dirname, "public")))

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

//Rotas
app.use('/', admin) // lembrar de colocar o nome /admin antes da rota.

//Conexão
const port = 8080
app.listen(port, () => {
    console.log(`Servidor rodando na porta https//:localhost:${port}`)
})

//imagem fundo login https://ibb.co/ss3DDtJ