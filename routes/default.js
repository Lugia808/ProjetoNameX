const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs')


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('ID do usuário autenticado:', req.user.id);
    }
    else{
        console.log('Você não está logado')
    }
    res.render('home');
});

module.exports = router