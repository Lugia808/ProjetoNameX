const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/Database/User');
const serviceTypes = require('../models/Database/ServiceTypes');
const Categoria = require('../models/Database/Categoria');
const ServiceTypes = require('../models/Database/ServiceTypes');

router.get('/cadastrarservico', async (req, res) => {
    if (req.isAuthenticated()) {
        const UserType = await User.findOne({ where: { id: req.user.id } });
        if (UserType) {
            const Categorias = await Categoria.findAll()
            if (UserType.dataValues.tipo === 'admin') {
                res.render('cadastrarServico', {
                    admin: 'admin',
                    session: req.user.id,
                    Categorias: Categorias
                });
            }
            else {
                console.log('Usuário não é um admin')
                res.redirect('/')
            }
        }
    }
    else {
        console.log('Sem sessão')
        res.redirect('/')
    }
})

router.post('/cadastrarservico', (req, res) => {

    const { nomedoServico, descricao, categoria, basePreco } = req.body

    ServiceTypes.create({
        nomedoServico: nomedoServico,
        descricao: descricao,
        categoria: categoria,
        basePreco: basePreco
    }).then(() => {
        req.flash('success_msg', 'Tipo de serviço criado com sucesso!');
        res.redirect('/admin/cadastrarservico')
    }).catch((error) => {
        req.flash('error_msg', 'Ocorreu um erro ao criar o serviço.');
        console.log('Ocorreu algum erro ao criar o tipo de serviço: ' + error)
        res.redirect('/admin/cadastrarservico')
    })

})

//Categoria: Ex. Análise, treinamento, consultoria.
router.get('/cadastrarcategoria', async (req, res) => {
    if (req.isAuthenticated()) {
        const UserType = await User.findOne({ where: { id: req.user.id } });
        if (UserType) {
            console.log(UserType.dataValues.tipo)
            if (UserType.dataValues.tipo === 'admin') {
                res.render('cadastrarCategoria', {
                    admin: 'admin',
                    session: req.user.id
                });
            }
            else {
                console.log('Usuário não é um admin')
                res.redirect('/')
            }
        }
    }
    else {
        console.log('Sem sessão')
        res.redirect('/')
    }
})

router.post('/cadastrarcategoria', (req, res) => {
    const { categoria, descricao } = req.body

    Categoria.create({
        nomedacategoria: categoria,
        descricao: descricao,
    }).then(() => {
        req.flash('success_msg', 'Categoria criada com sucesso!');
        res.redirect('/admin/cadastrarcategoria')
    }).catch((error) => {
        req.flash('error_msg', 'Ocorreu um erro ao criar a categoria.');
        console.log('Ocorreu algum erro ao criar a categoria: ' + error)
    })

})

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
        tipo: 'admin',
        password: senhahash
    }).then(() => {
        console.log('Conta criada com sucesso!')
        req.flash('success_msg', 'Conta criada com sucesso!');
        res.redirect('/login')
    }).catch((error) => {
        req.flash('error_msg', 'Nome de usuário ou e-mail já existente.');
        console.log('Ocorreu algum erro ao criar a conta: ' + error)
    })

})

router.get('/home', (req, res) => {
    if (req.isAuthenticated()) {
        const tec = 'admin'
        res.render('adminHome', {
            tec: tec,
            session: req.user.id,
        })
    }
    else {
        res.redirect('/')
    }
})

router.get('/delete', async (req, res) => {
    const CategoriaData = await Categoria.findAll();
    const ServiceTypesData = await ServiceTypes.findAll();
    const tec = 'admin'
    res.render('delete', {
        CategoriaData: CategoriaData,
        ServiceTypesData: ServiceTypesData,
        tec: tec,
        session: req.user.id,
    })

})

router.get(`/deleteCategoria/:id`, async (req, res) => {

    await Categoria.destroy({
        where: { id: req.params.id }
    }).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso!');
        res.redirect('/admin/delete')
    }).catch((error) => {
        req.flash('error_msg', 'Ocorreu um erro ao criar a categoria.');
        console.log('Ocorreu algum erro ao criar a categoria: ' + error)
    })

})

router.get(`/deleteServico/:id`, async (req, res) => {

    await ServiceTypes.destroy({
        where: { id: req.params.id }
    }).then(() => {
        req.flash('success_msg', 'Tipo de serviço deletado com sucesso!');
        res.redirect('/admin/delete')
    }).catch((error) => {
        req.flash('error_msg', 'Ocorreu um erro ao deletar o tipo de serviço.');
        console.log('Ocorreu algum erro ao criar o tipo de serviço: ' + error)
    })

})
module.exports = router