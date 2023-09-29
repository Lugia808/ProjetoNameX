const localStrategy = require('passport-local').Strategy
const { sequelize, Sequelize } = require('../models/Database/Database')
const bcrypt = require('bcryptjs')
const User = require('../models/Database/User')

require('../models/Database/User')

module.exports = function (passport) {

    passport.use(new localStrategy({ usernameField: 'username', passwordField: 'senha' }, (username, senha, done) => {
        console.log('teste')
         
        User.findOne({ where: { username: username } }).then((usuario) => {
            console.log('pegou')
            if (!usuario) {
                console.log('teste')

                message.push('Esta conta não existe')
                return done(null, false, { message: 'Esta conta não existe' })
            }

            bcrypt.compare(senha, usuario.dataValues.password, (erro, batem) => {
                if (batem) {
                    console.log('teste')

                    return done(null, usuario)
                }
                if(erro){
                    console.log(erro)
                } else {
                    console.log('teste')
                    return done(null, false, { message: 'Senha incorreta' })
                }
            })
        }).catch((erro) => {
            console.log('Ocorreu um erro ' + erro)
        })
    }))

    passport.serializeUser((user, done) => {
        console.log('pegando 1')
        console.log('ID do usúario (passport) ', user.id)
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        console.log('pegando 2');
        User.findByPk(id)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err, null);
            });
    });

}