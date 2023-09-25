const express = require('express');
const app = express();
const admin = require('./routes/admin')
const handlebars = require('express-handlebars')
const path = require('path');
//Config
//handlebars
    app.engine("handlebars", handlebars.engine({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
//Midleware

 //Public
 app.use(express.static(path.join(__dirname, "public")))

 app.use(express.static('images'))


//Rotas
    app.use('/', admin) // lembrar de colocar o nome /admin antes da rota.

//Conexão
    const port = 8080
    app.listen(port, () => {
        console.log(`Servidor rodando na porta https//:localhost:${port}`)
    })

    //imagem fundo login https://ibb.co/ss3DDtJ