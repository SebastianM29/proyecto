
import {devLogger} from '../helpers/devLogger.js';
import {prodLogger} from '../helpers/prodLogger.js';

import config from "../config/config.js"


/** middleware */
export const addLogger = async(req,res,next) => {
    let ent = "developmenft"
    let logger
    logger = config.entorno === ent ? devLogger: prodLogger


    req.logger = logger
   
    next()

}