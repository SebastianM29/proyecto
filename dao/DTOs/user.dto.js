

export default class UserDTO {
    constructor(user) {
        console.log('deberia ver el usuario',user)
        this.first_name = (user.first_name).toUpperCase()
        this.last_name  = user.last_name || 'no info'
        this.age = user.age || 'no info'
        this.email = user.email
        this.carts = user.carts
        this.role = user.role
  
    }

}