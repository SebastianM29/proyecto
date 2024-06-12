import { findByIdChangePremiumPer, findUser, getUserByIdPerAndCharge, perFindByIDAndUpdate } from "../persistence/session.js"



export const findServiceUSer = async(email) => {
  return await findUser(email)
}

export const serviceFindByIDanUpdate = async(token,pass) => {
  return await perFindByIDAndUpdate(token,pass)
}

export const getUserByIdServAndCharge = async (id,charge) => {
  return await getUserByIdPerAndCharge(id,charge)
}
export const findByIdChangePremiumSer = async(id) => {
  return await findByIdChangePremiumPer(id)

}