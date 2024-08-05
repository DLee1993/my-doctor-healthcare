import * as sdk from "node-appwrite";

export const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    DOCTOR_DB_COLLECTION,
    PATIENT_DB_COLLECTION,
    APPOINTMENT_DB_COLLECTION,
    NEXT_PUBLIC_DB_STORAGE: STORAGE_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

//- create client
const client = new sdk.Client();

// - set the endpoint, project and api key
client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

//- here we create the variables that will be used the access the individual parts of the appwrite project
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
