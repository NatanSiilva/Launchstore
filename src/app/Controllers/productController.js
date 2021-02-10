const Category =  require('../models/Category')
const Product =  require('../models/Product')
const File =  require('../models/File')


const { formatPrice, date } = require('../../lib/utils')



module.exports = {

    async create(req, res) { //Pegar as categorias 
        try {
            const categories = await Category.findAll()
            return res.render("products/create.njk", { categories })
        } catch (error) {
           console.error(error) 
        }
    },

    async post(req, res) { 
        try {
            //Logica de salvar
            const keys = Object.keys(req.body)  

            for(key of keys) {
                if (req.body[key] == "") {
                    
                    return res.send("Please, fill all fields!")
                }
            }

            if(req.files.length == 0 ) {
                return res.send("Please, send at teast one image")
            }

            const { Category_id, name, description, old_price, price, quantity, status } = req.body

            let price = price.replace(/\D/g,"")

            const product_id = await Product.create({
                Category_id,
                user_id: req.session.userId,
                name, 
                description, 
                old_price: old_price || price,
                price, 
                quantity, 
                status: status || 1
            })

            const filesPromise = req.files.map(file => 
                File.create({...file, product_id
            }))

            await Promise.all(filesPromise)

            return res.redirect(`/products/${product_id}/edit`)
        } catch (error) {
            console.error(error)
        }
    },

    async show(req, res) {
        try {
            const product =  await Product.find(req.params.id)
  
            if(!product) return res.send("Product Not Found!") 

            const { day, hour, minutes, month } = date(product.updated_at)

            product.published = {
                day: `${day}/${month}`,
                hour: `${hour}h${minutes}`
            }

            product.oldPrice = formatPrice(product.old_price)
            product.price = formatPrice(product.price)


            let files = await Product.files(product.id)
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))
            return res.render("products/show", { product, files })
        } catch (error) {
            console.error(error)
        }
    },

    async edit(req, res) {
        try {
            const product = await Product.find(req.params.id)

            if(!product) return res.send("product not found!")

            product.old_price = formatPrice(product.old_price)
            product.price = formatPrice(product.price)

            const categories = await Category.findAll()

            //get images
            let files = await Product.files(product.id)
            files = files.map(file => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`
            }))

            return res.render("products/edit", { product, categories, files })
        } catch (error) {
            console.error(error)
        }
    },

    async put(req, res) {
        try {
            const keys = Object.keys(req.body)  

            for(key of keys) {
                if (req.body[key] == ""  && key != "removed_files") {
                    return res.send("Please, fill all fields!")
                }
            }

            if(req.files.length != 0 ) {
                const newFilesPromise = req.files.map(file => File.create({...file, product_id: req.body.id}))
                await Promise.all(newFilesPromise)
            }

            if(req.body.removed_files) { //1,2,3
                const removedFiles = req.body.removed_files.split(",") // [1,2,3,]
                const lastIndex = removedFiles.length - 1

                removedFiles.splice(lastIndex, 1) //[1,2,3]

                const removedFilesPromise = removedFiles.map(id => File.delete(id))
                await Promise.all(removedFilesPromise)
            }

            req.body.price = req.body.price.replace(/\D/g,"")

            if(req.body.old_price != req.body.price) {
                const oldPrice = await Product.find(req.body.id)
                req.body.old_price = oldPrice.rows[0].price
            }

            await Product.update(req.body)
            return res.redirect(`/products/${req.body.id}`)
        } catch (error) {
            console.error(error)
        }  
    },

    async delete(req, res) {
        await Product.delete(req.body.id)

        return res.redirect('/products/create')
    }
}