const express = require('express');
const router = express.Router();
const { sequelize, Sequelize } = require('../models/Database/Database')
const passport = require('passport');
const bcrypt = require('bcryptjs')


router.get('/cadastro', (req, res)=>{
    res.render('cadastroEMP')
})

module.exports = router