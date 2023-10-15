var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/Database/User')
module.exports = function (passportG) {

    passport.use(new GoogleStrategy({
        clientID: '770354001527-aa04kkqtvmqf347jhhmtmu08toll4q1t.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:8080/callback",
    }, function (accessToken, refreshToken, profile, done) {
        // Extraia informações relevantes do perfil do Google
        // console.log('PROFILE: ' + JSON.stringify(profile, null, 2));
        const googleId = profile.id;
        // console.log('googleId: ', googleId)
        const email = profile.emails[0].value;
        // console.log('emails: ', email)
        const username = profile.displayName;
        // console.log('Username: ', username)

        // Crie um novo usuário com base no perfil do Google
        User.findOrCreate({
            where: { id: googleId },
            defaults: {
                username: username,
                email: email,
                tipo: 'tecnico',
                password: 'senha-aleatoria-gerada',
            }
        }).then(([user, created]) => {
            // user: instância do usuário encontrado ou criado
            // created: true se um novo usuário foi criado, false se um usuário existente foi encontrado
            passport.serializeUser((user, done) => {
                console.log('Serializando usuário.');
        
                done(null, user.id)
            })
        
            passport.deserializeUser((id, done) => {
                console.log('Desserializando usuário.');
                User.findByPk(id)
                    .then((user) => {
                        done(null, user);
                    })
                    .catch((err) => {
                        done(err, null);
                    });
            });
            return done(null, user);
        }).catch((err) => {
            return done(err, null); //erro aqui / problema quando uma conta já existe (resolver)
        });
    }));

}