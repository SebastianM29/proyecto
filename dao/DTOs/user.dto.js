

export default class UserDTO {
    constructor(user) {
        this.first_name = (user.first_name).toUpperCase()
        this.last_name  = user.last_name || 'no info'
        this.age = user.age || 'no info'
        this.email = user.email
        this.carts = user.carts
        this.role = user.role || 'user'
        this.id = user.id || 'ID'
        this.perfilPicture = user.perfilPicture
        // this.perfilPicture = user.perfilPicture || 'empty'
        // this.perfilPicture = user.perfilPicture !== undefined ? user.perfilPicture : 'empty';
        
        console.log('deberia ver el usuario: DTO',user)
    }

}