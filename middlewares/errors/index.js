import EErrors from "../../services/errors/enums.js";


export default (error, req, res, next) => {

 

  switch (error.code) {
    case EErrors.NOT_FOUND:
      console.log('deberia entrar?');
       res
         .status(404)
         .json({ status: "Error", message: error.message ,causa : error.cause, error: error.name});
       break;
    case EErrors.REPEAT_CODE:
      console.log('err repeat');
       res
         .status(400)
         .json({ status: "error codigo repetido", error: error.name,causa : error.cause, message: error.message });
       break;
    case EErrors.ROUTING_ERROR:
      console.log('err router');
       res
         .status(400)
         .json({ status: "Carga de producto",  message: error.message ,causa : error.cause, error: error.name});
       break;
     default:
       res.status(500).json({ status: "error",causa : error.cause, error: "Error no contemplado" });
 
       break;
   }
 };