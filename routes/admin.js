const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs')

const User = require('../models/Database/User')

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {

    User.findOne({where: {username: 'Natanael'}}).then((usuario)=>{
        console.log(usuario.dataValues.password)
    })

    var message = []
    passport.authenticate("local", {

        successRedirect: "/",  // se autenticação ocorrer com sucesso
        failureRedirect: "/login",// se ocorrer alguma falha na autenticação
        failureFlash: true,
    })(req, res, next)
});


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

module.exports = router