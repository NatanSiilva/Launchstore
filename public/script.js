
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
    input: "",
    preview: document.querySelector('#photo-preview'),
    uploadLimit: 6,
    files: [],

    handleFileInput(event) {

        const { files: fileList } = event.target
        PhotosUpload.input = event.target
        
        if(PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)
            
            const reader = new FileReader() //Permite ler arquivos
            reader.readAsDataURL(file) // O ONLOAD vai ficar pronto quando ler os arquivos 
            
            reader.onload = () => { //  Quando ele estiver pronto ONLOAD execute essa função
                const image = new Image() // Mesma coisa de fazerno html <img/>
                image.src = String(reader.result)
                const div = PhotosUpload.getContainer(image)
                PhotosUpload.preview.appendChild(div)
            }

        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },

    hasLimit(event) {
     
        const { uploadLimit,  input, preview} = PhotosUpload
        const { files: fileList } = input


        if(fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhoto = fileList.length + photosDiv.length
        if (totalPhoto > uploadLimit) {
            alert("Você atingiu o limite máximo de fotos.")
            event.preventDefault()
            return true
        }

        return false
    },

    getAllFiles() {

        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))
        return dataTransfer.files
    },

    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')
        div.onclick =  PhotosUpload.removePhoto
        div.appendChild(image)
        div.appendChild(PhotosUpload.getRemoveButton())
        return div
    },


    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },

    removePhoto(event) {
        const photoDiv = event.target.parentNode //div class photo
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    }

}
