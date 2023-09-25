const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/login', (req, res)=>{
    res.render('login')
})

router.get('/cadastro', (req, res)=>{
    res.render('cadastroTECp1')
})

router.get('/cadastro2', (req, res)=>{
    res.render('cadastroTECp2')
})

module.exports = router