
const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const ProductController = require('./app/controllers/productController.js')

routes.get('/', (req, res) => {
    return res.render("layout.njk")
})


routes.get('/products/create', ProductController.create )
routes.get('/products/:id/edit', ProductController.edit )

routes.post('/products', multer.array("photos", 6), ProductController.post)
routes.put('/products', multer.array("photos", 6), ProductController.put)
routes.delete('/products', ProductController.delete)



//Alias Atalhos
routes.get('/ads/create', (req, res) => {
    return res.render("products/create")
})



module.exports = routes