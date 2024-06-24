const deleteItem = async(id) => {
    try {
        console.log('deberia ver este id ',id)
        const resp = await fetch(`/api/session/deleteUser/${id}`,{
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