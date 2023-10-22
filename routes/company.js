const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs');


const User = require('../models/Database/User')


router.get('/cadastro', (req, res) => {
    res.render('cadastroEMP', { message: req.flash('info') });
})

router.post('/cadastro', async (req, res) => {
    const { user, email, senha } = req.body;

    const salt = await bcrypt.genSalt(10);
    const senhahash = await bcrypt.hash(senha, salt);

    User.create({
        username: user,
        email: email,
        tipo: 'empresa',
        password: senhahash
    })
        .then(() => {
            // Set a success flash message
            req.flash('success_msg', 'Conta criada com sucesso!');
            res.redirect('/login');
        })
        .catch((error) => {
            req.flash('error_msg', 'Nome de usuário ou e-mail já existente');
            console.log('Ocorrreu um erro: '+ error)
            res.redirect('/company/cadastro')
        });
});


module.exports = router