const deleteItem = async(id) => {
    try {
        const resp = await fetch(`/api/session/deleteUser?id=${id}`,{
            method:'DELETE'
        })
        if (resp.ok) {
            console.log('salio joya');
            window.location.reload()
        }
        if (!resp.ok) {
            console.log('salio mal');
        }
        
    } catch (error) {

        console.log(error);
        
    }
}

const deleteBefore = async () => {
    try {
        const admin = document.querySelector('h1').getAttribute('data-id')
        let check = true
        console.log(admin);
        const resp = await fetch(`/api/session/deleteUser?check=${check}`,{
            method:'DELETE',
            headers:{
                'content-Type' : 'application/json'
            },
            body: JSON.stringify({admin})
        })
        if (resp.ok) {
            console.log('salio joya');
            window.location.reload()
        }
        if (!resp.ok) {
            console.log('salio mal');
        }
        
    } catch (error) {

        console.log(error);
        
    }
}

const detectedRol = async (id) => {
    try {
       
        const actualValue = document.getElementById(`select-${id}`).value
       
        const value = {
            id,
            role:actualValue
        }
        const resp = await fetch('/api/session/change',{
            method: 'PUT',
            headers:{
              'content-Type' : 'application/json'  
            },
            body: JSON.stringify(value)
        })
        if (resp.ok) {
            const res = await resp.json()
            console.log(res);
            window.location.reload()
        }
        if(!resp.ok) {
            const res = await resp.json()
            console.log(res);
        }
        
    } catch (error) {
        console.log(error);
    }

}