const db = require('../../config/db')

module.exports = {
    
    all() {
        return db.query(`
            SELECT * FROM products ORDER BY updated_at DESC
        `)
    },

    create(data) {
        const query = `
            INSERT INTO products (
                category_id,
                user_id,
                name,
                description,
                old_price,
                price,
                quantity,
                status
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        // entra assim R$1.23
        data.price = data.price.replace(/\D/g,"")
        // chega no db assim 123 , dai qundo for mostrar no front temo que converter ele como era antes; 123/100 = 1,23


        const values = [
            data.category_id,
            data.user_id || 1,
            data.name,
            data.description,
            data.old_price || data.price,
            data.price,
            data.quantity,
            data.status || 1                  
        ]
        
        
        return db.query(query, values)
    },

    find(id) {
        return db.query(`SELECT * FROM products WHERE id = $1`, [id])
    },

    update(data) {
        const query = `
            UPDATE products SET 
                category_id=($1),
                user_id=($2),
                name=($3),
                description=($4),
                old_price=($5),
                price=($6),
                quantity=($7),
                status=($8)
            WHERE id = $9    
        `

        const values = [
            data.category_id,
            data.user_id,
            data.name,
            data.description,
            data.old_price,
            data.price,
            data.quantity,
            data.status,
            data.id
        ]

        return db.query(query, values)
    },

    delete(id) {
        
        return db.query('DELETE FROM products WHERE id = $1', [id])
    },

    files(id) {

        return db.query(`
            SELECT * FROM files WHERE product_id = $1
        `, [id])
    },

    search(params) {
        const { filter, category } = params

        let query = "",
            filterQuery = ` WHERE`

        if (category) {

        }

        
    }
 
}