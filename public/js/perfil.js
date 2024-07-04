


console.log('hola');

const perfil = document.querySelector('#perfilPicture')


perfil.addEventListener('submit',async(e) =>{
    try {
        e.preventDefault()
        const id = document.querySelector('.data').getAttribute('data-id')
        const pic = document.querySelector('#upload').files[0]
        const pictureElement = document.getElementById('picture').src.split('proyecto-production-1d58.up.railway.app/')[1]
        let picturepath = 'empty'

        // if (pictureElement && pictureElement.src.includes('proyecto-production-1d58.up.railway.app/')) {
        //     picturepath = pictureElement.src.split('proyecto-production-1d58.up.railway.app/')[1];

            
        // }
        const formData = new FormData()
        console.log(picturepath);
        
        formData.append('perfilPicture',pic)
        formData.append('picturepath',pictureElement)
        console.log('andando bien',picturepath);
        console.log('andando bien',pic);
        const resp = await fetch(`https://proyecto-production-1d58.up.railway.app/api/session/${id}/picture`,{
            method: 'POST',
            body: formData
        })
        if (!resp.ok) {
            const res = await resp.json()
            console.log('anda mal',res);
        }
        if (resp.ok) {
            console.log('anda joya');
            window.location.reload()
        }

    } catch (error) {
        console.log(error);
    }

})