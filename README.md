#Proyecto final

Postman
* peticion post

Creacion de productos 
![alt text](readme/image.png)
Creacion de producto en base de datos
![alt text](readme/image-1.png)

* Metodo Get con paginado de todos los productos, se establece un limits de 2 con filtrado en muebleria, tanto asc como desc funcionan correctamente
![alt text](readme/image-2.png)
* Obtener producto por id 
![alt text](readme/image-3.png)
![alt text](readme/image-4.png)
* Creacion de carrito
![alt text](readme/image-5.png)
![alt text](readme/image-6.png)
* Peticion get de todos los carritos 
![alt text](readme/image-7.png)
* Obtener producto por id 
![alt text](readme/image-8.png)
![alt text](readme/image-9.png)
* Agregar producto en el carrito 
![alt text](readme/image-10.png)
![alt text](readme/image-11.png)
* Borrar carrito por id
![alt text](readme/image-12.png)
![alt text](readme/image-13.png)
![alt text](readme/image-14.png)
![alt text](readme/image-15.png)
* Actualizar cantidad de productos del carrito
![alt text](readme/image-16.png)
![alt text](readme/image-17.png)
![alt text](readme/image-18.png)
![alt text](readme/image-19.png)
* Actualizar solo la cantidad del producto seleccionado por id
![alt text](readme/image-20.png)
![alt text](readme/image-21.png)
![alt text](readme/image-22.png)
* Borrando todos los productos del carrito
![alt text](readme/image-23.png)
* frontend handlebars visualizacion de base de datos, paginado y posterior guardado de productos en los carritos..enumerados
![alt text](readme/image-24.png)
seleccionando carrito 6 y mascara
![alt text](readme/image-28.png)
![alt text](readme/image-29.png)
* Yendo al apartado carritos y seleccionando el carrito 6
![alt text](readme/image-30.png)
Se obtiene el producto con la cantidad : 1
![alt text](readme/image-31.png)
y volviendo a los productos la mascara va a tener un stock de 31 debido a que a medida q se adjunta a un carrito va decrementando y guardando en la base de datos la cantidad de la misma
![alt text](readme/image-33.png)
* Pasando a la pagina siguiente en un producto donde no hay stock si se hace click va a mostrar un mensaje de "sin stock" 
![alt text](readme/image-34.png)


-a optimizar: incluir el boton de agregar al carrito en un submit parea manipular mejor su correcto funcionamiento-

# Implementacion Login
Entregable 

* Se implemento un registro en el cual se puede seleccionar Admin o user, y solo es permitido un usuario "Admin" con el email : "adminCoder@coder.com" y el password : "adminCod3r123"

![alt text](readme/image-35.png)
![alt text](readme/image-41.png)
* Admin creado 
![alt text](readme/image-42.png)

*login de Admin
![alt text](readme/image-43.png)
* Campo Admin creado solo para ese usuario, 'seba' traido de session
![alt text](readme/image-44.png)
* Otro usuario sin campo Admin
![alt text](readme/image-45.png)

*Apartado de Perfil con datos traidos desde session
![alt text](readme/image-47.png)





se implementa las vistas empleadas en el hands on lab asi como los controladores  , en los mismos se pueden ver el middleware en en cual se encargar de chequear mediante session si esta activo y puede ingresar a la pagina 

![alt text](readme/image-36.png)

* controladores vistas

![alt text](readme/image-37.png)

* Rutas de session 

![alt text](readme/image-38.png)

* controladores de session 

![alt text](readme/image-39.png)

* Middleware para emplear en las rutas

![alt text](readme/image-40.png)

* Guardado en base de datos solo un Admin 
![alt text](readme/image-46.png)


* Se agrego extra ... el campo de admin / user en el registro con mensajes de error o exito asi como en login... a la hora de agregar un producto al carrito el stock va disminuyendo... a la hora de llegar a 0 informa q queda "sin stock" -(Solucionado)
Queda obviada la generacion de ruta privada ya q solo deje visual el campo de Admin.

*intento de compra con dos productos que exceden de stock
![alt text](readme/image-48.png)


*compra realizada con las excepciones de los productos sin stock
![alt text](readme/image-49.png)

*agrego al carro y actualizo pagina para q se intenten agregar la misma cantidad la cual me tiraba error.... e hice un filter para solucionar ese error 
![alt text](readme/image-50.png)
*como se ve en el adjunto haciendo esto supera el stock q hay 
![alt text](readme/image-51.png)
*haciendo como dije un filter en el array solucionado, y mejora visual
![alt text](readme/image-53.png)
*entorno Produccion
![alt text](readme/image-56.png)
*entorno Desarrollo
![alt text](readme/image-57.png)
*ruta testeo logger
![alt text](readme/image-55.png)
*se inserta un link para recuperar password 
![alt text](readme/image-58.png)
*Get para un envio de mail al correo
![alt text](readme/image-59.png)
*el cual mediante un post a una funcion dentro de la carpeta controladores maneja la logica de nodemailer
![alt text](readme/image-60.png)
*para enviar a otro Get y rechazar si el token expira o validarlo si esta dentro de los limites establecidos de dicho token
![alt text](readme/image-61.png)
![alt text](readme/image-62.png)
*manejando errores en el front enviado desde el backend como : "pass mayor a 8 caracteres" , "no repetir contraseña" o en este caso y dentro de esta pagina "envie email nuevamente"(token vencido).
![alt text](readme/image-67.png)
![alt text](readme/image-64.png)
![alt text](readme/image-65.png)
![alt text](readme/image-66.png)
*Documentacion en Swagger
![alt text](readme/image-68.png)
Pruebas de test en el desarrollo
![alt text](readme/image-69.png)
*Usuarios Premium
![alt text](image-1.png)
*Subida de documentos en el cual posteriormente se valida si estan los archivos y te habilita subir productos
![alt text](image-2.png)
*se agrego imagenes tanto en carpeta de productos,perfil y documentos ( visualizacion )
![alt text](image-3.png)
![alt text](image-4.png)