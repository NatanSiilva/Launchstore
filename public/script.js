
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


const PhotosUpload = {

    preview: document.querySelector('#photo-preview'),
    uploadLimit: 6,
    
    handleFileInput(event) {
       const { files: fileList } = event.target 
        
        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {
            
            const reader = new FileReader() //Permite ler arquivos
            reader.readAsDataURL(file) // O ONLOAD vai ficar pronto quando ler os arquivos 
            reader.onload = () => { //  Quando ele estiver pronto ONLOAD execute essa função
                const image = new Image() // Mesma coisa de fazerno html<img/>
                image.src = String(reader.result)
                const div = PhotosUpload.getContainer(image)
                PhotosUpload.preview.appendChild(div)
            }
        })
    },

    hasLimit(event) {
        const { files: fileList } = event.target 
        const { uploadLimit } = PhotosUpload

        if(fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        return false
    },

    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')
        div.onclick = () => alert('remover foto')
        div.appendChild(image)
        return div
    }
}
