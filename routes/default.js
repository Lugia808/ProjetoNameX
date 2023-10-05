const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs')


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('ID do usuário autenticado:', req.user.id);
        
        res.render('home', {session : req.user.id});
    }
    else{
        console.log('Você não está logado')
        res.render('home')
    }

});

router.get('/home', (req, res) => {
//Home do técnico
    var session = 1

    res.render('homepage', {
        session: session
    })
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