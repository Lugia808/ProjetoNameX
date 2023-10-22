const express = require('express');
const router = express.Router();
const passport = require('passport');
const Services = require('../models/Database/Services');
const UserEMP = require('../models/Database/UserEMP')
const User = require('../models/Database/User');
const ServiceTypes = require('../models/Database/ServiceTypes');
const Categoria = require('../models/Database/Categoria');
const UserTEC = require('../models/Database/UserTEC');
const Candidato = require('../models/Database/Candidato')

  // Rota de autenticação do Google
router.get('/auth/google',
passport.authenticate('google', { scope: ['email', 'profile'] })
);

// Rota de callback após a autenticação bem-sucedida
router.get('/callback',
passport.authenticate('google', {
    successRedirect: '/', // Rota de sucesso
    failureRedirect: '/login', // Rota de falha
    failureFlash: true
})
);





router.get('/', async (req, res) => {
    if (req.isAuthenticated()) {
        const serviceData = await Services.findAll();
        const serviceTypes = await ServiceTypes.findAll();
        const UserData = await User.findOne({ where: { id: req.user.id } });
        const UserTypes = UserData.dataValues.tipo
        const CategoriaData = await Categoria.findAll();
        const UserTecData = await UserTEC.findOne({
            where: {
                UserId: UserData.dataValues.id
            }
        })

        if (UserTypes === 'admin') {
            res.redirect('/admin/home');
        }
        else {
            if (UserData) {
                if (UserTypes === 'tecnico') {

                    if (!UserTecData) {
                        req.flash('warning_msg', 'preencha essas informações para começarmos a nossa parceria');
                        res.redirect('/tec/infos')
                    }
                    if (UserTecData) {
                        const situacao = UserTecData.dataValues.situacao
                        if (situacao === 'pendente') {
                            res.redirect('/saladeespera')
                        }
                    }

                    const tec = 'tecnico'
                    res.render('default/homepage', {
                        serviceData: serviceData,
                        tec: tec,
                        CategoriaData: CategoriaData,
                        session: req.user.id,
                        serviceTypes: serviceTypes
                    });
                }
                else {
                    res.render('default/homepage', {
                        serviceData: serviceData,
                        session: req.user.id
                    });
                }
            }
        }
    }
    else {
        res.render('default/home')
    }

})

router.get('/home', async (req, res) => {
    if (req.isAuthenticated()) {
        const serviceData = await Services.findAll();
        const serviceTypes = await ServiceTypes.findAll();
        const UserData = await User.findOne({ where: { id: req.user.id } });
        const UserTypes = UserData.dataValues.tipo
        const CategoriaData = await Categoria.findAll();
        const UserTecData = await UserTEC.findOne({
            where: {
                UserId: UserData.dataValues.id
            }
        })

        if (UserTypes === 'admin') {
            res.redirect('/admin/home');
        }
        else {

            if (UserData) {
                if (UserTypes === 'tecnico') {

                    if (!UserTecData) {
                        req.flash('warning_msg', 'preencha essas informações para começarmos a nossa parceria');
                        res.redirect('/tec/infos')
                    }
                    if (UserTecData) {
                        const situacao = UserTecData.dataValues.situacao
                        if (situacao === 'pendente') {
                            res.redirect('/saladeespera')
                        }
                    }

                    const tec = 'tecnico'
                    res.render('default/homepage', {
                        serviceData: serviceData,
                        tec: tec,
                        CategoriaData: CategoriaData,
                        session: req.user.id,
                        serviceTypes: serviceTypes
                    });
                }
                else {
                    res.render('default/homepage', {
                        serviceData: serviceData,
                        session: req.user.id
                    });
                }
            }
        }
    }
    else {
        res.redirect('/')
    }

})



router.get('/criarservico', async (req, res) => {


    if (req.isAuthenticated()) {
        const serviceData = await Services.findAll();
        const serviceTypes = await ServiceTypes.findAll();
        const UserType = await User.findOne({ where: { id: req.user.id } });
        const CategoriaData = await Categoria.findAll();

        if (UserType) {
            if (UserType.dataValues.tipo === 'tecnico') {
                const tec = 'tecnico'
                res.render('default/homepage', {
                    serviceData: serviceData,
                    tec: tec,
                    CategoriaData: CategoriaData,
                    session: req.user.id,
                    serviceTypes: serviceTypes
                });
            }
            else {
                res.render('criarservico', {
                    serviceData: serviceData,
                    CategoriaData: CategoriaData,
                    session: req.user.id,
                    serviceTypes: serviceTypes
                });
            }
        }
    } else {
        res.redirect('/')
    }
})

router.post('/criarServico', async (req, res) => {
    if (req.isAuthenticated()) {
        const categoria = req.body.categoria;

        const CategoriaData = await Categoria.findOne({
            where: {
                nomedacategoria: categoria
            }
        })

        console.log(CategoriaData.dataValues.id)

        const ServiceTypesData = await ServiceTypes.findAll({
            where: {
                categoriaId: CategoriaData.dataValues.id
            }
        })

        res.render('criarservicop2', {
            ServiceTypesData: ServiceTypesData,
            categoria: categoria,
            session: req.user.id
        })

    }
    else {
        res.redirect('/')
    }
})

router.post('/criarServico_END', async (req, res) => {
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
            res.redirect('/')
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
                const tec = 'tecnico'
                res.render('Tec/servicos', {
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
    res.render('default/login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next)
});


router.get('/saladeespera', async (req, res) => {
    if (req.isAuthenticated()) {
        // Verifique se o usuário atual (req.user) está aprovado
        const isAprovado = await UserTEC.findOne({
            where: {
                UserId: req.user.id,
                situacao: 'aprovado'
            }
        });
        if(!isAprovado){
            res.render('Tec/waitingPage', {
                session: req.user.id
            });
        }else{
            res.redirect('/home')
        }



    } else {
        // O usuário não está aprovado, você pode redirecioná-lo ou mostrar uma mensagem de erro
        res.redirect('/'); // Ou outra ação adequada
    }
});


module.exports = router