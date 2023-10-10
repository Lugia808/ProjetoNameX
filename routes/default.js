const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs')

const Services = require('../models/Database/Services');
const UserEMP = require('../models/Database/UserEMP')

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('ID do usuário autenticado:', req.user.id);

        res.render('home', { session: req.user.id });
    }
    else {
        console.log('Você não está logado')
        res.render('home')
    }

});

router.get('/home', (req, res) => {
    //Home do técnico
    if (!req.isAuthenticated()) {
        res.redirect('/')
    }

    var session = 1


    res.render('homepage', {
        session: session
    })
})

router.post('/criarServico', (req, res) => {
    // const { nomeServico, descricaoServico, valorServico, categoria } = req.body;

    // UserEMP.findOne({
    //     where: {
    //         id: req.user.id
    //     }
    // }).then((result) => {
    //     console.log(result)
    //     Services.create({
    //         nomeServico: nomeServico,
    //         descricao: descricaoServico,
    //         categoria: categoria,
    //         valor: valorServico,
    //     })
    // })
// AJEITAR


})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next)
});

module.exports = router