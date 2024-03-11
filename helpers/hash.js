import bcrypt from "bcrypt";
import { dirname } from "path";
import { fileURLToPath } from "url";



export const createHash = (password) => {
   return bcrypt.hashSync(password,bcrypt.genSaltSync(10))

}


export const compare = (user,password) =>{ return bcrypt.compareSync(password,user.password)}

// const _filename = fileURLToPath(import.meta.url)
// const _dirname = dirname(_filename)

// export default _dirname