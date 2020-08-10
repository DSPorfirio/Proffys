const express = require("express");
const server = express();

const [ pageLanding, pageStudy, pageGiveClasses, saveClasses ] = require('./pages')

//Configurar nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
});

//Configuras arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//Receber os dados do req.body
.use(express.urlencoded({ extended: true}))

//Rotas
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(5500);