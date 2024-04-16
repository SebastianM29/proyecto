import fs  from 'fs'


export default class ProductServiceDB {
   constructor(){
        this.products = []
        
      
    }

    static path = 'products'
     
    async getProducts({limits}){
        try {
            await fs.promises.access(`${ProductServiceDB.path}.json`, fs.constants.F_OK)
            const data =  JSON.parse(fs.readFileSync(`${ProductServiceDB.path}.json`,'utf-8'))
            if (limits) {
                console.log('viendo el limit',limits)
                const limitResp = data.slice(0,limits)
                return limitResp
            }
            console.log('por fuera')
                return data
        } catch (error) {
            return 'Sin Datos en el archivo'
        }
    }
 
    async addProduct(obj){
        try {
            
            let newValue = 0
            let dataParse

                try {
                await fs.promises.access(`${ProductServiceDB.path}.json`)
                console.log('hay dato')
                const data = await fs.promises.readFile(`${ProductServiceDB.path}.json`,'utf-8')
                dataParse = JSON.parse(data)
                console.log(data)
                } catch (error) {
                    dataParse= []
                    console.log(' no hay dato')      
                }
                for (const values of dataParse) {
                      if (values.id > newValue) {
                      newValue = values.id

                }
                
                }

            let newProduct={
                id: newValue += 1,
                title:obj.title,
                description:obj.description,
                code:obj.code,
                price:obj.price,
                status:true,
                stock:obj.stock,
                category:obj.category,
                
            }

            
            for (const values of dataParse) {
                if (values.code === obj.code) {
                    return (`Codigo repetido:${obj.description}:Codigo ${obj.code}`)
                }
            }
          
         
            const algo = Object.entries(newProduct)
            .filter(([key,value])=>!value)
            .map(([key,value])=>key)
            
            if (algo.length > 0) {
                return (`estos campos deben venir : ${algo}`)
            }else{

                if (obj.thumbnail)  newProduct.thumbnail = [obj.thumbnail]
                   
                dataParse.push(newProduct)
                const productsArrayStrings = JSON.stringify(dataParse,null,2)
                await  fs.promises.writeFile(`${ProductServiceDB.path}.json`,productsArrayStrings)
                return {
                    msg:'Agregado exitosamente',
                    obj: newProduct  
                }
            }
            } catch (error) {
                throw error
            }
        }
          
        async deleteProducts(id){
            try {
                
               
                const data = await fs.promises.readFile(`${ProductServiceDB.path}.json`,'utf-8')
                let dataParse = JSON.parse(data)
             
                const idParse = JSON.parse(id)
                console.log('esto se ve fuera de for of',JSON.parse(id))

                for (const iterator of dataParse) {
                    
                    if (iterator.id === idParse) {
                        const find = dataParse.find((value)  => value.id === idParse)
                        const deleteSuccess = dataParse.filter(value => value.id !== idParse)
                       
                        dataParse = deleteSuccess
                        const productsArrayStrings = JSON.stringify(dataParse,null,2)
                        await fs.promises.writeFile(`${ProductServiceDB.path}.json`,productsArrayStrings)
            
                        return {msg:'producto borrado',
                                producto: find
                            }
                        }
                    }
                
                return `El id no es valido:${id}`

            } catch (error) {
                throw new Error
            }
        }
        
        async getProductById(id) {
        try {
            
            const data =await fs.promises.readFile(`${ProductServiceDB.path}.json`,'utf-8')
            const dataParse = JSON.parse(data)
            
            for (const iterator of dataParse) {
                console.log('entra al for?',iterator.id)
                if (iterator.id === JSON.parse(id)) {
                    const findId = dataParse.find((element) => element.id === iterator.id)
                    console.log(findId)
                    return findId
                }
                
            }
             return 'no existente'
          
          
            // return  findId ? findId 
            //  : `id numero:${id}, no existente`
        } catch (error) {
            throw error
        }
    }

    

      async updateProducts(id,update){

        try {
            
            let oldValue
            let fields =[]
            const data =await fs.promises.readFile(`${ProductServiceDB.path}.json`,'utf-8')
            const dataParse = JSON.parse(data)
            
            const findUpdate = dataParse.find((element) => element.id === JSON.parse(id))
          
            console.log('algo en update?', findUpdate,id)
            if (!findUpdate) {
                return 'no se encontro ningun id'
            }
           
            oldValue={...findUpdate}
            
           
            if (update.id) {
                return {msg:'No se puede cargar un nuevo ID'}
            }
            if (update.code) {
                return {msg:'El codigo no puede ser alterado'}
            }
            dataParse.map((element)=>{
                if (element.id === JSON.parse(id)) {
                    for (const key in update) {
                       if (!findUpdate[key]) {
                            console.log('verificANDO')
                            fields.push(key)
                            console.log('verificANDO',fields)
                        }
                       
                        element[key] = update[key]
                      
                    }
                }
            })
    
            if (fields.length > 0) {
                return {
                    msg:`campos no validos`,
                    campos:fields
            }
            }
    
           
            
            const  newUpdateString = JSON.stringify(dataParse,null,3)
            await fs.promises.writeFile(`${ProductServiceDB.path}.json`,newUpdateString)
            
            return {
                producto:oldValue,
                productoActualizado:findUpdate
            }






        } catch (error) {
            // console.error('Error', error.message)
            throw new Error ('Problema a la hora de actualiar producto')
        }
    }
}


