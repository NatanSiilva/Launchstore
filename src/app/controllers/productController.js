const { formatPrice } = require('../../lib/utils')
const Category =  require('../models/Category')
const Product =  require('../models/Product')


module.exports = {

    create(req, res) { //Pegar as categorias 
        Category.all()
        .then((results) => {
            const categories = results.rows
            return res.render("products/create.njk", { categories })
        }).catch((err) => {
            throw new Error(err)
        })
    },

    async post(req, res) { //Logica de salvar
        const keys = Object.keys(req.body)  

        for(key of keys) {
            if (req.body[key] == "") {
                
                return res.send("Please, fill all fields!")
            }
        }

        const results = await Product.create(req.body)
        const productId = results.rows[0].id

        return res.render(`/products/${productId}`)
    },


    async edit(req, res) {
        
        let results = await Product.find(req.params.id)
        const product = results.rows[0]

        if(!product) return res.send("product not found!")

        product.old_price = formatPrice(product.old_price)
        product.price = formatPrice(product.price)


        results = await Category.all()
        const categories = results.rows

        return res.render("products/edit.njk", { product, categories })
    },

    async put(req, res) {
        const keys = Object.keys(req.body)  

        for(key of keys) {
            if (req.body[key] == "") {
                
                return res.send("Please, fill all fields!")
            }
        }

        req.body.price = req.body.price.replace(/\D/g,"")

        if(req.body.old_price != req.body.price) {
            const oldPrice = await Product.find(req.body.id)
            req.body.old_price = oldPrice.rows[0].price
        }

        await Product.update(req.body)
        return res.redirect(`/products/${req.body.id}/edit`)
    },

    async delete(req, res) {
        await Product.delete(req.body.id)

        return res.redirect('/products/create')
    }
}