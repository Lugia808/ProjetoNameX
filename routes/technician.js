const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs')

const User = require('../models/Database/User')
require('../config/auth')(passport);

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/tec/home",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next)
});

//Fazer que de acordo com a conta logada redirecionar para sua rota (company, technician)


router.get('/cadastro', (req, res) => {
    res.render('cadastroTECp1')
})


router.post('/cadastro', async (req, res) => {

    const user = req.body.user;
    const senha = req.body.senha;
    const email = req.body.email;

    const salt = await bcrypt.genSalt(10);
    const senhahash = await bcrypt.hash(senha, salt);

    User.create({
        username: user,
        email: email,
        password: senhahash
    }).then(() => {
        console.log('Conta criada com sucesso!')
    }).catch((error) => {
        console.log('Ocorreu algum erro ao criar a conta: ' + error)
    })

})

router.get('/home', (req, res) => {

    var session = 1

    res.render('homepage', {
        session: session
    })
})

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });


module.exports = router