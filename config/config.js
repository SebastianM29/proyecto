import { config } from "dotenv";
config()

export default {
    port : process.env.PORT,
    mongourl : process.env.MONGOURL,
    sessionKey : process.env.SESSIONKEY,
    mongourlsession : process.env.MONGOURLSESSION,
    adminEmail : process.env.ADMINEMAIL,
    passAdmin : process.env.PASSADMIN,
    secretWORD:process.env.SECRETWORD,
    // clientID  :process.env.CLIENTID,
    // clientSecret : process.env.CLIENTSECRET,
    userNodemailer: process.env.MAIL,
    passNodemailer: process.env.MAIL_PASSWORD,
    callbackUrl :process.env.CALLBACKURL,
    persistence : process.env.PERSISTENCE,
    entorno: process.env.ENV

}

