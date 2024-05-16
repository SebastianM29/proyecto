import { UserDB } from "../dao/factory.js"
const user = new UserDB()


export const findUser = async(email) => {

return await user.getUserByEmail(email)

}

export const perFindByIDAndUpdate = (token, pass) => {
    return user.findByIdAndUPD(token,pass)
}