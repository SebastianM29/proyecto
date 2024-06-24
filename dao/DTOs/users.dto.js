export default class UsersDTO {
    constructor(user) {
     if (Array.isArray(user)) {
        return user.map(element => this.transformUser(element))
     } 
        this.transformUser(user)
    }

    transformUser(user) {
     
        return {
            first_name : (user.first_name).toUpperCase(),
            last_name  : user.last_name || 'no info',
            age : user.age || 'no info',
            email : user.email,
            role : user.role || 'user',
            id : user.id || 'ID',
            perfilPicture : user.perfilPicture || 'empty'
        }
    }

}