import { config } from "dotenv";
config()

export default {
    port : process.env.PORT,
    mongourl : process.env.MONGOURL,
    sessionKey : process.env.SESSIONKEY,
    mongourlsession : process.env.MONGOURLSESSION,
    adminEmail : process.env.ADMINEMAIL,
    passAdmin : process.env.PASSADMIN,
    // clientID  :process.env.CLIENTID,
    // clientSecret : process.env.CLIENTSECRET,
    callbackUrl :process.env.CALLBACKURL,
    persistence : process.env.PERSISTENCE

}

