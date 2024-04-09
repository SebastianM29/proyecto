import { config } from "dotenv";
config()

export default {
    port : process.env.PORT,
    mongourl : process.env.MONGOURL,
    sessionKey : process.env.SESSIONKEY,
    mongourlsession : process.env.MONGOURLSESSION
}

