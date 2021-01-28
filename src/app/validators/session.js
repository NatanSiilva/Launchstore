const User = require('../models/User')
const { compare } = require('bcryptjs')


async function login(req, res, next) {

    // verificar  seo usuário está cadastrado
    const { email, password } = req.body
    const user = await User.findOne({ where:{email} })
    if(!user) return res.render("session/login", {
        user: req.body,
        error: "Usário não cadastrado!"
    })

    // verificar se o password bate
    const passed = await compare(password, user.password)// descriptografado
    if(!passed) return res.render("session/login", {
        user: req.body,
        error: "Senha incorreta."
    }) 
    // Colocar o usuário no req.session
    req.user = user

    next()
}


module.exports = {
    login
}