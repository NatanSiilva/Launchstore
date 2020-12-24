
const express = require('express')
const routes = express.Router()
const ProductController = require('./app/controllers/productController.js')

routes.get('/', (req, res) => {
    return res.render("layout.njk")
})


routes.get('/products/create', ProductController.create )
routes.get('/products/:id/edit', ProductController.edit )

routes.post('/products', ProductController.post)
routes.put('/products', ProductController.put)
routes.delete('/products', ProductController.delete)



//Alias Atalhos
routes.get('/ads/create', (req, res) => {
    return res.render("/products/create")
})



module.exports = routes