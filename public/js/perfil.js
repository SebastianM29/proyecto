


console.log('hola');

const perfil = document.querySelector('#perfilPicture')


perfil.addEventListener('submit',async(e) =>{
    try {
        e.preventDefault()
        const id = document.querySelector('.data').getAttribute('data-id')
        const pic = document.querySelector('#upload').files[0]
        const picturepath = document.getElementById('picture').src.split('localhost:3000/')[1]
        const formData = new FormData()
        console.log(picturepath);
        
        formData.append('perfilPicture',pic)
        formData.append('picturepath',picturepath)
        console.log('andando bien',picturepath);
        const resp = await fetch(`/api/session/${id}/picture`,{
            method: 'POST',
            body: formData
        })
        if (!resp.ok) {
            console.log('anda mal');
        }
        if (resp.ok) {
            console.log('anda joya');
            window.location.reload()
        }

    } catch (error) {
        console.log(error);
    }

})