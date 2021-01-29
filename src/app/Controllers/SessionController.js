const crypto = require('crypto')
const User = require('../models/User')
const mailer = require('../../lib/mailer')


module.exports = {
    loginForm(req, res) {
        return res.render("session/login")
    },

    login(req, res) {
        req.session.userId = req.user.id
        return res.redirect("/users")
    },

    logout(req, res) {
        req.session.destroy() //destroi a session do usuario
        return res.redirect("/")
    },

    forgotForm(req, res) {
        return res.render("session/forgot-password")
    },

    async forgot(req, res) {

        const user = req.user

        try {

            // Um token para esse usuário, guardoms o tohen na tabela do user
            const token = crypto.randomBytes(20).toString("hex")

            // criar limete de tempo para expiração do token
            let now = new Date()
            now = now.setHours(now.setHours() + 1)

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            // enviar um email de verificação com um link de recuperação de senha
            await mailer.sendMail({
                to: user.email,
                from: 'igrejaplenitudeevida@gmail.com',
                subject: 'Recuperação de senha',
                html: `
                    <h2>Perdeu a chave ?</h2>
                    <p>
                        Não se preocupe, clique no link abaixo para recuperar a sua senha.
                    </p>
                    <p>
                        <a href="http://localhost:3000/users/password-reset?=token${token}" target="_blank">
                            Recuperar Senha
                        </a>
                    </p>
                `

            })

            // avisar o usuário que enviamos o email    
            return res.render("session/forgot-password", {
                success: "Verificar seu email para resetar sua senha."
            })    
            
        } catch (error) {
            console.error(error)
            return res.render("session/forgot-password", {
                error: "Error inesperado, tente novamente!"
            })    
        }
    },

    resetForm(req, res) {
        return res.render("session/password-reset", { token: req.query.token })
    },

    reset(req, res) {
        const { email, password, passwordRepeat, token }  =  req.body

        try {

            // criar umnovo hash de senha


            // atualizar o usuário


            // avisa o usuário que ele tem uma nova senha
            
        } catch (error) {
            console.log(erro)
            return res.render("session/password-reset", {
                success: "Verificar seu email para resetar sua senha."
            })  
        }
    }

}   