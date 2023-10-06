const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs')

const User = require('../models/Database/User')
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
        res.redirect('/tec/login')
    }).catch((error) => {
        console.log('Ocorreu algum erro ao criar a conta: ' + error)
    })

})

router.get('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });


module.exports = router