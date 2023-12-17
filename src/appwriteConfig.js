import { Client, Databases,Account } from 'appwrite';

// export const PROJECT_ID ='657d6f385315834bbffa'
// export const DATABASE_ID ='657d710c6f667e02c077'
// export const COLLECTION_ID_MESSAGES ='657d71233ec387530b9d'
export const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;
export const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
export const COLLECTION_ID_MESSAGES = process.env.REACT_APP_COLLECTION_ID_MESSAGES;

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('657d6f385315834bbffa');

export const databases = new Databases(client);
export const account = new Account(client);
    

    export default client