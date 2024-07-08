


export class Usuarios {
    constructor(){
        this.personas = []
    }


    addUser(usuario,id){
        let users = {usuario,id}
        this.personas.push(users)
        return this.personas

    }
    getPersonaPorId(id){
      const find = this.personas.filter(element => element.id === id)
      return find
    }

    getAllUsers(){
        return this.personas
    }
}