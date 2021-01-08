
const express = require('express')
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const ProductController = require('./app/controllers/productController.js')
const HomeController = require('./app/controllers/HomeController.js')
const SearchController = require('./app/controllers/SearchController')


//home
routes.get('/', HomeController.index)

//search
routes.get('/products/search', SearchController.index)

//products
routes.get('/products/create', ProductController.create )
routes.get('/products/:id/edit', ProductController.edit )
routes.get('/products/:id', ProductController.show )

routes.post('/products', multer.array("photos", 6), ProductController.post)
routes.put('/products', multer.array("photos", 6), ProductController.put)
routes.delete('/products', ProductController.delete)



//Alias Atalhos
routes.get('/ads/create', (req, res) => {
    return res.render("products/create")
})




module.exports = routes