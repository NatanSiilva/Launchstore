const User = require('../models/User')

async function post(req, res, next) {
    //check if all fields
    const keys = Object.keys(req.body)  

    for(key of keys) {
        if (req.body[key] == "") { 
            return res.send("Please, fill all fields!")
        }
    }

    //check if user exists [email, cpf_cnpj]
    let { email, cpf_cnpj, password, passwordRepeat } = req.body
    
    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.findOne({
        where: { email },
        or:{ cpf_cnpj }
    }) 

    if(user) return res.send('User exists')

    // check if password match
    if(password != passwordRepeat) 
        return res.send('Password Mismatch') 
    
    next()
}

module.exports = {
    post
}