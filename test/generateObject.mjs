import { faker } from '@faker-js/faker';

export function generateObject() {
    return {
        id: faker.database.mongodbObjectId(),
        filepath: faker.system.filePath(),   
    }
}