import {fakerES_MX as faker} from '@faker-js/faker'



export const generateUsers = () => {
   


    return {
        // id: faker.database.mongodbObjectId(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.string.numeric(2),
        password: faker.string.numeric(6),
        role: "user",
        // carts: faker.database.mongodbObjectId()
    }
}
