
/*
input.addEventListener("keydown", (event) => {

    setTimeout(() => {
        let { value } = event.target

        value = value.replace(/\D/g,"")

        value = new Intl.NumberFormat('pt-br', {
            style: 'currency', //1.000,00
            currency: 'BRL' //R$
        }).format(value/100)
        
        event.target.value = value
    }, 1)
})

*/


const Mask = {

    aplly(input, func) {
        setTimeout(() => {
            input.value = Mask[func](input.value)
        }, 1)
    },

    formatBRL(value) {
        value = value.replace(/\D/g,"")

        return value = new Intl.NumberFormat('pt-br', {
            style: 'currency', //1.000,00
            currency: 'BRL' //R$
        }).format(value/100)
    }
}



const formDelete = document.querySelector('#form-delete')
formDelete.addEventListener("submit", (event) => {
    const confirmation = confirm("Deseja Deletar?")
    if(!confirmation) event.preventDefault
})



const PhotosUpload = {
    uploadLimit: 6,
    handleFileInput(event) {
        const { files: fileList } = event.target
        const { uploadLimit } = PhotosUpload

        if(fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return
        }
    }
}
