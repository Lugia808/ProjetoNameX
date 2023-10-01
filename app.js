const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');

// Configuração do Handlebars
app.engine("handlebars", handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Flash Messages
app.use(flash());

// Rotas
const defaultRoutes = require('./routes/default');
const adminRoutes = require('./routes/admin');
const technicianRoutes = require('./routes/technician');
const companyRoutes = require('./routes/company');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);
app.use('/tec', technicianRoutes);
app.use('/company', companyRoutes);

// Porta de escuta
const port = 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta https://localhost:${port}`);
});

//imagem fundo login https://ibb.co/ss3DDtJ