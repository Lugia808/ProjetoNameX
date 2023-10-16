const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/Database/User');
const serviceTypes = require('../models/Database/ServiceTypes');
const Categoria = require('../models/Database/Categoria');
const ServiceTypes = require('../models/Database/ServiceTypes');
const UserTEC = require('../models/Database/UserTEC');

router.get('/cadastrarservico', async (req, res) => {
    if (req.isAuthenticated()) {
        const UserType = await User.findOne({ where: { id: req.user.id } });
        if (UserType) {
            const Categorias = await Categoria.findAll()
            if (UserType.dataValues.tipo === 'admin') {
                res.render('admin/cadastrarServico', {
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

router.post('/cadastrarservico', async (req, res) => {

    const { nomedoServico, descricao, categoria, basePreco } = req.body
    const CategoriaData = await Categoria.findAll({
        where: {
            nomedacategoria: categoria
        }
    })

    console.log(CategoriaData[0].id)
    ServiceTypes.create({
        nomedoServico: nomedoServico,
        descricao: descricao,
        categoria: categoria,
        basePreco: basePreco,
        categoriaId: CategoriaData[0].id
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
                res.render('admin/cadastrarCategoria', {
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
    res.render('Tec/cadastroTECp1') //cadastro admin
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
        console.log('olha eu aqui')
        const admin = 'admin'
        res.render('admin/adminHome', {
            admin: admin,
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
    res.render('admin/delete', {
        CategoriaData: CategoriaData,
        ServiceTypesData: ServiceTypesData,
        tec: tec,
        session: req.user.id,
    })

})

router.get(`/deleteCategoria/:id`, async (req, res) => {

    await Categoria.destroy({
        where: {id: req.params.id}
    }).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso!');
        res.redirect('/admin/delete')
    }).catch((error) => {
        req.flash('error_msg', 'Ocorreu um erro ao criar a categoria.');
        res.redirect('/admin/delete')
    })

})

router.get(`/deleteServico/:id`, async (req, res) => {

    await ServiceTypes.destroy({
        where: { id: req.params.id}
    }).then(() => {
        req.flash('success_msg', 'Tipo de serviço deletado com sucesso!');
        res.redirect('/admin/delete')
    }).catch((error) => {
        req.flash('error_msg', 'Ocorreu um erro ao deletar o tipo de serviço.');
        console.log('Ocorreu algum erro ao criar o tipo de serviço: ' + error)
    })

})


router.get('/validarTEC', async (req, res) => {
    if (req.isAuthenticated()) {
        const Admin = await User.findOne({
            where: {
                id: req.user.id,
                tipo: 'admin'
            }
        })
        if (Admin) {
            try {
                const TecInfo = await UserTEC.findAll({
                    where: {
                        situacao: 'pendente'
                    },
                    include: [
                        {
                            model: User,
                            as: 'UserKey', // usar o alias definido na relação
                            attributes: ['username'] // Aqui c tem que especificar  oq c quer da tabela
                        }
                    ]
                });

                const TecInfoAprovados = await UserTEC.findAll({
                    where: {
                        situacao: 'aprovado'
                    },
                    include: [
                        {
                            model: User,
                            as: 'UserKey', // Use o alias definido na relação
                            attributes: ['username'] // Especifique quais atributos da tabela User deseja buscar
                        }
                    ]
                });

                // O resultado da consulta conterá o username da tabela User
                res.render('admin/validacao', {
                    TecInfo: TecInfo,
                    TecInfoAprovados: TecInfoAprovados
                });
            } catch (error) {
                // Lida com erros, se houver algum
                res.status(500).send('Erro ao buscar usuários pendentes');
            }
        }else{
            res.redirect('/')
        }
    }
    else {
        res.redirect('/')
    }
});

router.get('/validarUsuario/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Atualize o status do usuário para 'aprovado' (ou o valor desejado) no banco de dados
        const user = await UserTEC.findByPk(userId);
        if (user) {
            user.situacao = 'aprovado'; // Atualize para o valor desejado
            await user.save();
            req.flash('success_msg', 'Validação concluída com sucesso!');
            res.redirect('/admin/validarTEC');
        }
    } catch (error) {
        req.flash('error_msg', 'Ocorreu um erro ao validar o profissional.');
        res.redirect('/admin/validarTEC');
    }
});



module.exports = router