"use server";

import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );

        console.log(newUser);
        return parseStringify(newUser);
    } catch (error: any) {
        if (error && error?.code === 409) {
            const existingUser = await users.list([Query.equal("email", [user.email])]);

            return existingUser.users[0];
        }
        console.error("An error occurred while creating a new user:", error);
    }
};

export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId);

        return parseStringify(user);
    } catch (error) {
        console.error(error);
    }
};

export const registerPatient = async ({
    identificationDocument,
    ...patient
}: RegisterUserParams) => {
    try {
        // add patient data to appwrite storage
        let file;

        if (identificationDocument) {
            const inputFile = InputFile.fromBuffer(
                identificationDocument?.get("blobFile") as Blob,
                identificationDocument?.get("fileName") as string
            );

            file = await storage.createFile(
                `${process.env.NEXT_PUBLIC_DB_STORAGE}`,
                ID.unique(),
                inputFile
            );
        }

        console.log({
            identificationDocumentId: file?.$id || null,
            identificationDocumentUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_DB_STORAGE}/files/${file?.$id}/file/view?project/=${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        });

        const newPatient = await databases.createDocument(
            `${process.env.DATABASE_ID}`,
            `${process.env.PATIENT_DB_COLLECTION}`,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_DB_STORAGE}/files/${file?.$id}/file/view?project/=${process.env.NEXT_PUBLIC_PROJECT_ID}`,
                ...patient,
            }
        );
        return parseStringify(newPatient);
    } catch (error) {
        console.log(error);
    }
};
