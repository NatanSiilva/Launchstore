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

async function forgot(req, res, next) {

    const { email } = req.body

    try {
        let user = await User.findOne({ where: { email } })

        if(!user) return res.render("session/forgot-password", {
            user: req.body,
            error: "Email não cadastrado!"
        })

        req.user = user
 
        next()
    } catch (error) {
        console.error(error)
    }
}

async function  reset(req, res, next) {
    // procurar usuario
    const { email, password, passwordRepeat, token } = req.body
    const user = await User.findOne({ where:{ email } })

    if(!user) return res.render("session/password-reset", {
        user: req.body,
        token,
        error: "Usário não cadastrado!"
    })

    // verificar se a senha bate
    if(password != passwordRepeat) {
        return res.render('session/password-reset',  {
            user: req.body,
            token,
            error: 'A nova senha e a repitição não coferem.'
        })
    }

    // verificar se o token é o mesmo
    if (token != user.reset_token) return res.render('session/password-reset',  {
        user: req.body,
        token,
        error: 'Token invalido! Solicite uma nova recuperação de senha.'
    })


    // verificar se o token não expirou
    let now = new Date()
    now = now.setHours(now.getHours())

    if(now > user.reset_token_expires) return res.render('session/password-reset',  {
        user: req.body,
        error: 'Token expirado! Por favor, solicite uma nova recuperação de senha.'
    })

    req.user = user

    next()
}

module.exports = {
    login,
    forgot,
    reset
}