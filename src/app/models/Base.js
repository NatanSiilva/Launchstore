const db = require('../../config/db')
const { create } = require('./Product')




const Base = {
    init({ table }) {
        if(!table) throw new Error('Ivalid Params')

        this.table = table

        return this
    },

    async findOne(filters) {
        let query = `SELECT * FROM ${this.table}`

        Object.keys(filters).map(key => {

            query = `${query}
                ${key}
            `

            Object.keys(filters[key]).map((field) => {
                query = `${query} ${field} = '${filters[key][field]}'`
            })
        })

        const results = await db.query(query)

        return results.rows[0]
    },

    async create(fields) {
        //User.create({name: 'mayke})
        try {
            let keys = [],
                values = []

            Object.keys(fields).map((key, index, array) => {
                keys.push(key)
                values.push(fields[key])

                // if((index + 1) < array.length) {
                //     keys += `${key},`
                //     values += `${fields[key]},`
                // } else {
                //     keys += `${key}`
                //     values += `${fields[key]}`
                // }
            })
            
            const query = `INSERT INTO ${this.table} (${keys.join(',')})
                VALUES (${values.join(',')})
                RETURNING id
            `
            const results = await db.query(query)
            return results.rows[0].id

        } catch (error) {
            console.error(error)
        }
    },

    update(id, fields) {

        try {
            
            let upadate = []

            Object.keys(fields).map((key, index, array) => {
                // category_id=($1)
                const line = `${key} = '${fields[key]}'`
                upadate.push(line)
            })

            let query = `UPDATE ${this.table} SET
                ${upadate.join(',')} WHERE id = ${id}
            `

            return db.query(query) 
        } catch (error) {
            console.log(error)
        }
    },

    delete(id) {
        return db.query('DELETE FROM products WHERE id = $1', [id])
    },

}


module.exports = Base