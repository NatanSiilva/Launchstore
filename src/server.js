const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({ extendens: true }))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk')

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: true,
    noCache: true
})


server.listen(3030, (req, res) => {
    console.log("server is running")
})



