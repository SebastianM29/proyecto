import { changeRolePer, deleteBeforeTwoPer, deleteUserPer, findByIdChangePremiumPer, findUser, getAllusersPer, getUserByIdPerAndCharge, perFindByIDAndUpdate, updateAnythingPer } from "../persistence/session.js"



export const findServiceUSer = async(email) => {
  return await findUser(email)
}
export const updateAnythingSer = async (id,upd) => {
  return await updateAnythingPer(id,upd)
}
export const serviceFindByIDanUpdate = async(token,pass) => {
  return await perFindByIDAndUpdate(token,pass)
}

export const getUserByIdServAndCharge = async (id,charge) => {
  return await getUserByIdPerAndCharge(id,charge)
}

export const changeRoleSer= async(id,role) => {
  return await changeRolePer(id,role)
}

export const findByIdChangePremiumSer = async(id) => {
  return await findByIdChangePremiumPer(id)
}

export const getAllUsersSer = async () =>{
  return await getAllusersPer()
}

export const deleteUserSer = async (id) => {
  return await deleteUserPer(id)
}

export const deleteBeforeTwoSer = async(admin) => {
return await deleteBeforeTwoPer(admin)
}
