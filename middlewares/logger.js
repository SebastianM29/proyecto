
import {devLogger} from '../helpers/devLogger.js';
import {prodLogger} from '../helpers/prodLogger.js';

import config from "../config/config.js"
import { testingLogger } from '../helpers/testLogger.js';


/** middleware */
export const addLogger = async(req,res,next) => {
    let ent = "development"
    let logger
    logger = config.entorno === ent ? devLogger: prodLogger


    req.logger = logger
   
    next()

}


export const testLogger = (req,res,next) => {
    req.logger = testingLogger

    next()
}