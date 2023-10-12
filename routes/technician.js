const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs')

const User = require('../models/Database/User');
const UserTEC = require('../models/Database/UserTEC');
const UserEMP = require('../models/Database/UserEMP');
require('../config/auth')(passport);

//Fazer que de acordo com a conta logada redirecionar para sua rota (company, technician)


router.get('/cadastro', (req, res) => {
    res.render('cadastroTECp1')
})


router.post('/cadastro', async (req, res) => {

    const user = req.body.user;
    const senha = req.body.senha;
    const email = req.body.email;

    console.log(user, senha, email)

    const salt = await bcrypt.genSalt(10);
    const senhahash = await bcrypt.hash(senha, salt);

    User.create({
        username: user,
        email: email,
        tipo: 'tecnico',
        password: senhahash
    }).then(() => {
        console.log('Conta criada com sucesso!')
        req.flash('success_msg', 'Conta criada com sucesso!');
        res.redirect('/login')
    }).catch((error) => {
        req.flash('error_msg', 'Nome de usuário ou e-mail já existente.');
        console.log('Ocorreu algum erro ao criar a conta: ' + error)
    })

})

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/infos', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('tecInfos')
    } else {
        res.redirect('/')
    }
})

router.post('/infos', (req, res) => {
    if (req.isAuthenticated()) {
        const num_registro = req.body.num_registro;

        UserTEC.create({
            num_registro: num_registro,
            situacao: 'pendente',
            UserId: req.user.id,
        }).then(() => {
            console.log('Conta criada com sucesso!')
            req.flash('success_msg', 'Enviado com sucesso! Aguarde.');
            res.redirect('/saladeespera')
        }).catch((error) => {
            req.flash('error_msg', 'Ocorreu algum erro ao enviar o número de registro');
            console.log('Ocorreu algum erro ao enviar o número de registro: ' + error)
            res.redirect('/tec/infos')
        })
    }
    else {
        res.redirect('/')
    }
})


module.exports = router