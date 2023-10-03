const localStrategy = require('passport-local').Strategy
const { sequelize, Sequelize } = require('../models/Database/Database')
const bcrypt = require('bcryptjs')
const User = require('../models/Database/User')

require('../models/Database/User')

module.exports = function (passport) {

    passport.use(new localStrategy({ usernameField: 'username', passwordField: 'senha' }, (username, senha, done) => {

        User.findOne({ where: { username: username } }).then((usuario) => {
            if (!usuario) {
                message.push('Esta conta não existe')
                return done(null, false, { message: 'Esta conta não existe' })
            }

            bcrypt.compare(senha, usuario.dataValues.password, (erro, batem) => {
                if (batem) {
                    return done(null, usuario)
                }
                if (erro) {
                    console.log('erro, arquivo auth: ' + erro)
                } else {
                    return done(null, false, { message: 'Senha incorreta' })
                }
            })
        }).catch((erro) => {
            console.log('Ocorreu um erro ' + erro)
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findByPk(id)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err, null);
            });
    });

}