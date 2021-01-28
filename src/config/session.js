const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./db')


module.exports = session({
    store: new pgSession({
        pool: db
    }),
    secret: 'iabadabaduu',
    resave: false, // quero que salve apenas uma vez essa session
    saveUninitialized: false, // só quero salvar quando tiver dados,so quando for usuario
    cookie: {
        maxAge: 30 * 24 * 60 * 1000 // quanto tempo essa session vai ficar ativa no sisitema, no banco de dados. 30 dias.
    }
})