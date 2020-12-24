module.exports = {

    date(timestamp) {

        const date = new Date(timestamp)

        const year =  date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${year}-${month}`,
            format: `${day}/${month}/${year}`
        }
    },

    formatPrice(price) {
        return value = new Intl.NumberFormat('pt-br', {
            style: 'currency', //1.000,00
            currency: 'BRL' //R$
        }).format(price/100)
    }

}



