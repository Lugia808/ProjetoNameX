const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

// Configuração do Handlebars
app.engine("handlebars", handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//FLash
app.use(session({
    secret: 'your-secret-key', // Change this to a secure secret key
    resave: false,
    saveUninitialized: false
}));

const flash = require('connect-flash')

app.use(flash());


// Middleware

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    res.locals.error = req.flash("error");
    
    next();
})



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
