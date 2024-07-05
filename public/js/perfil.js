


console.log('hola');

const perfil = document.querySelector('#perfilPicture')


perfil.addEventListener('submit',async(e) =>{
    try {
        e.preventDefault()
        const id = document.querySelector('.data').getAttribute('data-id')
        const pic = document.querySelector('#upload').files[0]
        // const pictureElement = document.getElementById('picture').src.split('proyecto-production-1d58.up.railway.app/')[1]
        

       let pictureElement
        let formData = new FormData()
      
        formData.append('perfilPicture',pic)
        formData.append('picturepath',pictureElement)

        // console.log('FormData content:')
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({id})

        console.log('andando bien',pictureElement);
        console.log('andando bien',pic);
        const resp = await fetch(`/api/session/${id}/picture`,{
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