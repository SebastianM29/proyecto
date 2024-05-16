import { findUser, perFindByIDAndUpdate } from "../persistence/session.js"



export const findServiceUSer = async(email) => {
  return await findUser(email)
}

export const serviceFindByIDanUpdate = async(token,pass) => {
  return await perFindByIDAndUpdate(token,pass)
}