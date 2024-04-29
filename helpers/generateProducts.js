import {fakerES_MX as faker} from '@faker-js/faker'



export const generateProducts = () => {
    const cadenaAlfanumerica = faker.string.alphanumeric({})
    const valorBooleano = cadenaAlfanumerica.length % 2;


    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(4),
        price: faker.commerce.price(),
        status: valorBooleano,
        stock: true,
        category: faker.commerce.productName()

    }
}
