"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { UserFormValidation } from "@/lib/Validation";
import { createUser } from "@/lib/actions/patient.actions";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldTypes } from "../CustomFormField";
import CustomSubmitButton from "../CustomSubmitButton";

const RegisterForm = () => {
    // - loading state for button
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // - get router to push to new page on successfull sign up
    const router = useRouter();

    // - setting resolvers and default values for react hook form
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    });

    // - submitting user data to twillio
    async function onSubmit(values: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);

        try {
            const user = { name: values.name, email: values.email, phone: values.phone };

            const newUser = await createUser(user);

            if (newUser) router.push(`/patients/${newUser.$id}/register`);
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 flex-1">
                <section className="mb-6 space-y-2">
                    <h1 className="header">Hi there 👋</h1>
                    <p className="text-dark-700 text-sm">Register to schedule your first appointment</p>
                </section>
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldTypes.INPUT}
                    name="email"
                    label="Email Address"
                    placeholder="JohnDoe@jsEmail.pro"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />
                <CustomFormField
                    control={form.control}
                    fieldType={FormFieldTypes.PHONE_INPUT}
                    name="phone"
                    label="Phone number"
                    placeholder="(555) 123-4567"
                />
                <CustomSubmitButton isLoading={isLoading}>Get Started</CustomSubmitButton>
            </form>
        </Form>
    );
};

export default RegisterForm;
