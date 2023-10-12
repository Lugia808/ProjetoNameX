const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs')

const Services = require('../models/Database/Services');
const UserEMP = require('../models/Database/UserEMP')
const User = require('../models/Database/User');
const ServiceTypes = require('../models/Database/ServiceTypes');
const Categoria = require('../models/Database/Categoria')

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

router.get('/home', async (req, res) => {
    if (req.isAuthenticated()) {
        console.log('teste123')
        const serviceData = await Services.findAll();
        const serviceTypes = await ServiceTypes.findAll();
        const UserType = await User.findOne({ where: { id: req.user.id } });
        const CategoriaData = await Categoria.findAll();

        if (UserType.dataValues.tipo === 'admin') {
            res.redirect('/admin/home');
        }
        else {

            if (UserType) {
                if (UserType.dataValues.tipo === 'tecnico') {
                    // console.log(serviceTypes)
                    // console.log(serviceData)
                    console.log(serviceData)

                    

                    const tec = 'tecnico'
                    res.render('homepage', {
                        serviceData: serviceData,
                        tec: tec,
                        CategoriaData: CategoriaData,
                        session: req.user.id,
                        serviceTypes: serviceTypes
                    });
                }
                else {
                    res.render('homepage', {
                        serviceData: serviceData,
                        session: req.user.id
                    });
                }
                if (serviceData) {
                    console.log('teste')
                }
            }
        }
    }
    else {
        res.redirect('/')
    }

})

router.post('/criarServico', async (req, res) => {
    const { nomeServico, descricao, valorServico, categoria } = req.body;
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) {
            const userData = user.toJSON();
            const createdService = await Services.create({
                nomedoServico: nomeServico,
                descricao: descricao,
                categoria: categoria,
                valor: valorServico,
                contratante: userData.username,
                situacao: 'vazio',
            });
            console.log('Serviço criado com sucesso!', createdService.toJSON());
            res.redirect('/servicos')
        } else {
            console.log('Usuário não encontrado');
            res.redirect('/home')
        }
    } catch (error) {
        console.log('Ocorreu um erro ao criar o serviço:', error);
        res.send('ERRO AHHAHAAHHAHAHHA')
    }
});

router.get('/servicos', async (req, res) => {
    if (req.isAuthenticated()) {
        const serviceData = await Services.findAll();
        const UserType = await User.findOne({ where: { id: req.user.id } });
        if (UserType) {
            if (UserType.dataValues.tipo === 'tecnico') {
                console.log('pegou')
                const tec = 'tecnico'
                res.render('servicos', {
                    serviceData: serviceData,
                    tec: tec,
                    session: req.user.id
                });
            }
            else {
                res.render('servicos', {
                    serviceData: serviceData,
                    session: req.user.id
                });
            }
            if (serviceData) {
                console.log('teste')
            }
        }
    }
    else {
        res.redirect('/')
    }
});





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