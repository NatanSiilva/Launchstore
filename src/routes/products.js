const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer')

const ProductController = require('../app/Controllers/productController.js')
const SearchController = require('../app/Controllers/SearchController')


// Search
routes.get('/search', SearchController.index)

//products
routes.get('/create', ProductController.create )
routes.get('/:id/edit', ProductController.edit )
routes.get('/:id', ProductController.show )

routes.post('/', multer.array("photos", 6), ProductController.post)
routes.put('/', multer.array("photos", 6), ProductController.put)
routes.delete('/', ProductController.delete)


module.exports = routes