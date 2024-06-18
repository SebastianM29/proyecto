


console.log('hola');

const perfil = document.querySelector('#perfilPicture')


perfil.addEventListener('submit',async(e) =>{
    try {
        e.preventDefault()
        const id = document.querySelector('.data').getAttribute('data-id')
        const pic = document.querySelector('#upload').files[0]
        const formData = new FormData()
        
        formData.append('perfilPicture',pic)
        console.log('andando bien',id,pic);
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