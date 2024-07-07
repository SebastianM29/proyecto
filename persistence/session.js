import { UserDB } from "../dao/factory.js"
const user = new UserDB()


export const findUser = async(email) => {

return await user.getUserByEmail(email)

}
export const updateAnythingPer = async (id,upd) => {
return  await user.updateAnything(id,upd)
}  
export const perFindByIDAndUpdate = async(token, pass) => {
return await user.findByIdAndUPD(token,pass)
}

export const getUserByIdPerAndCharge = async(id,charge) => {
return await user.getUserByIdAndCharge(id,charge)
}

export const changeRolePer = async(id,role) =>{
return await user.changeRole(id,role)
}

export const findByIdChangePremiumPer = async (id) => {
return await user.findByIdChangePremium(id)
}


export const getAllusersPer = async() => {
return await user.getAllUsers()
}

export const deleteUserPer = async(id) => {
return await user.deleteUser(id)
}

export const deleteBeforeTwoPer = async (admin) => {
return await user.deleteBeforeTwo(admin)
}
