const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")
const methodOverride = require('method-override')
const session = require('./config/session')

const server = express()

server.use(session)
server.use((req, res, next) => {
    res.locals.session = req.session // Criando uma variavel global com node, para ser acessada emqualquer lugar como njk
    next()
})

server.use(express.urlencoded({ extendend: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: true,
    noCache: true
})


server.listen(5000, (req, res) => {
    console.log("server is running")
})



