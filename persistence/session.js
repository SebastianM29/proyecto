import { UserDB } from "../dao/factory.js"
const user = new UserDB()


export const findUser = async(email) => {

return await user.getUserByEmail(email)

}

export const perFindByIDAndUpdate = (token, pass) => {
    return user.findByIdAndUPD(token,pass)
}

export const getUserByIdPerAndCharge = async(id,charge) => {
    return user.getUserByIdAndCharge(id,charge)
}

export const findByIdChangePremiumPer = async (id) => {
return user.findByIdChangePremium(id)
}

export const getAllusersPer = async() => {
return user.getAllUsers()
}

export const deleteUserPer = async(id) => {
return user.deleteUser(id)
}