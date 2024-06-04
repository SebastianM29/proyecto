import * as chai from "chai";
import supertest from "supertest";
import { describe, before, beforeEach, it} from "mocha";
import { generateUsers } from "../helpers/generateUser.js";


const expect = chai.expect
const requester = supertest('http://localhost:3000/')


describe('testing',()=> {

    describe('Productos',()=>{
        let productId

        before(async()=>{
        
        const obj={
         title : "Taladro",
         description: "Taladro Stanley",
         code: 23,
         price: 100,
         stock: 40,
         category: "ferreteria",
    
        }
      
        const {ok,statusCode,_body} = await requester.post('products').send(obj)
       
        productId = _body.prod._id
      
        })
    
                 it('solicitud Get : Deberia obtener un producto por Id', async()=> {
                    const {_body,ok,status} = await requester.get(`products/${productId}`)
                    
                    expect(status).to.be.ok
                    expect(_body).to.have.property('productos')
                    expect(_body.productos).to.have.property('title','Taladro')
                 })
                 it('solicitud Post  : Deberia obtener un 404 ', async()=> {
                    const newObj={
                       
                        description: "amoladora DeWalt",
                        code: 234,
                        price: 1000,
                        stock: 4,
                        category: "ferreteria",
                   
                       }


                    const {ok,statusCode,_body} = await requester.post('products').send(newObj)
                  
                    expect(statusCode).to.equal(400)
                   
                 })
       
    
             it('solicitud Put: Actualizacion de producto',async()=> {
              const putObj = {
                  title: "Taladro percutor",
                  description: "Makita"
              }
              const {_body,ok,status} = await requester.put(`products/${productId}`).send(putObj);
          
              expect(status).to.be.ok
              expect(_body.resp.actualizado).to.have.property('title','Taladro percutor')
             })
    
            it("Eliminando producto por id",async()=> {
                const {_body,ok,status} = await requester.delete(`products/${productId}`)
                
                 expect(status).to.be.ok
            })
    
    
    })

    describe('Carts',() => {
           let cartsId
           before(async() => {
            const {ok,statusCode,_body} = await requester.post('carts')
            cartsId = _body._id
          
           })
       
           it('buscar por id', async() => {

                      console.log(cartsId);
                      const {_body,statusCode} = await requester.get(`carts/${cartsId}`)
                     

                      expect(_body._id).to.equal(cartsId)
                      expect(statusCode).to.be.ok
                      expect(_body).to.have.property('products').that.is.an('array')
           })
           it('Agregar un producto al carrito', async() => {
                      const {_body,statusCode} = await requester.post(`carts/${cartsId}/products/665886f307eb7dae26d41635`)
                    
                      console.log(statusCode);
                      expect(statusCode).to.be.ok
           })
           it('formateo de un carrito', async() => {
                
                  
                      const {statusCode,_body} =   await requester.delete(`carts/${cartsId}`)
                      

                      expect(statusCode).to.be.ok
                      expect(_body.cart.products).to.be.an('array').that.is.empty
                      expect(_body).to.have.property('msg',' formateado con exito productos')

                      
                      
           })

           describe('Autenticación de Usuario', () => {
            let cookie; // Variable para almacenar la cookie de sesión
            let anotherCookie
           // Test para registrar un nuevo usuario y obtener la cookie de sesión
            it('registro, usuario creado por faker', async () => {
          
                const user = generateUsers()
        
                const response = await requester.post('api/session/register').send(user);
                anotherCookie = response.headers['set-cookie'][0];
               
                expect(response.statusCode).to.equal(302);
            });


        
           // Test para iniciar sesión correctamente con el usuario registrado anteriormente
            it('debería iniciar sesión correctamente', async () => {
                const mockUs = {
                    email: 'juan@hotmail.com',
                    password: '123',
                };
                
                const response = await requester.post('api/session/login').send(mockUs);
                cookie = response.headers['set-cookie'][0];

                const profileResponse = await requester.get('profile').set('Cookie', cookie);
                const text = profileResponse.text
               
               

                expect(response.headers['set-cookie']).to.be.ok;
                expect(text).to.include('juan@hotmail.com')
                // Verifica que se haya establecido la sesión correctamente
            });
        
            //Test para cerrar sesión correctamente
            it('debería cerrar sesiónes correctamente', async () => {
                const response = await requester.get('api/session/logout').set('Cookie', cookie);
                const responseTwo = await requester.get('api/session/logout').set('Cookie', anotherCookie);
        
                const cookies = response.headers['set-cookie'].map(cookie => cookie.split(';')[0]);
                const cookiesTwo = responseTwo.headers['set-cookie'].map(cookie => cookie.split(';')[0]);
                expect(cookies).to.include('connect.sid=');
                expect(cookiesTwo).to.include('connect.sid=');
                //Verifica que la sesión se haya eliminado correctamente
            });
        });
        ;
        
        
        
        
 
        
        
    }) 
    
    
    
})