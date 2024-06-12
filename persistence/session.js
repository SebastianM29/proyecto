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