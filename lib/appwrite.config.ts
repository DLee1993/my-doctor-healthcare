import * as sdk from "node-appwrite";

//- create client
const client = new sdk.Client();

// - set the endpoint, project and api key
client
    .setEndpoint(`${process.env.NEXT_PUBLIC_ENDPOINT}`)
    .setProject(`${process.env.NEXT_PUBLIC_PROJECT_ID}`)
    .setKey(`${process.env.NEXT_PUBLIC_API_KEY}`);

//- here we create the variables that will be used the access the individual parts of the appwrite project
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
