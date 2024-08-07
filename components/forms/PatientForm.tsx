"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { UserFormValidation } from "@/lib/Validation";
import { createUser } from "@/lib/actions/patient.actions";

import { useForm } from "react-hook-form";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField, { FormFieldTypes } from "../CustomFormField";
import CustomSubmitButton from "../CustomSubmitButton";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";

const PatientForm = ({ user }: { user: User }) => {
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
        console.log(values);
        // setIsLoading(true);

        // try {
        //     const user = { name: values.name, email: values.email, phone: values.phone };

        //     const newUser = await createUser(user);

        //     if (newUser) router.push(`/patients/${newUser.$id}/register`);
        // } catch (error) {
        //     console.log(error);
        // }

        // setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <fieldset className="space-y-6">
                    <h2 className="sub-header mb-3">Personal Information</h2>

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.INPUT}
                        name="name"
                        label="Full Name"
                        placeholder="John Doe"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />

                    <div className="flex flex-col gap-6 xl:flex-row">
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
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.DATE_PICKER}
                            showTimeSelect={true}
                            name="birthDate"
                            label="Date of birth"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.SKELETON}
                            name="gender"
                            label="Gender"
                            renderSkeleton={(field) => (
                                <FormControl>
                                    <RadioGroup
                                        className="flex h-11 gap6 xl:justify-between"
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        {GenderOptions.map((option) => (
                                            <div key={option} className="radio-group">
                                                <RadioGroupItem value={option} id={option} />
                                                <Label htmlFor={option} className="cursor-pointer">
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.INPUT}
                            name="address"
                            label="Address"
                            placeholder="14th Street, New york"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.INPUT}
                            name="occupation"
                            label="Occupation"
                            placeholder="Software Engineer"
                        />
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.INPUT}
                            name="emergencyContactName"
                            label="Emergency Contact Name"
                            placeholder="Guardian's name"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.INPUT}
                            name="emergencyContactNumber"
                            label="Emergency Contact Number"
                            placeholder="(555) 123-4567"
                        />
                    </div>
                </fieldset>

                <fieldset className="space-y-6">
                    <h2 className="sub-header mb-3">Medical Information</h2>

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.SELECT}
                        name="primaryPhysician"
                        label="Primary Physician"
                        placeholder="Select a Physician"
                    >
                        {Doctors.map((doctor) => (
                            <SelectItem
                                key={doctor.name}
                                value={doctor.name}
                                className="hover:bg-dark-500 cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={doctor.image}
                                        alt={doctor.name}
                                        width={32}
                                        height={32}
                                        className="rounded-full border border-dark-500"
                                    />
                                    <p>{doctor.name}</p>
                                </div>
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.INPUT}
                            name="insuranceProvider"
                            label="Insurance provider"
                            placeholder="BlueCross, BlueShield"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.INPUT}
                            name="insurancePolicyNumber"
                            label="Insurance policy number"
                            placeholder="ABC12345679"
                        />
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.TEXTAREA}
                            name="allergies"
                            label="Allergies (if any)"
                            placeholder="Peanuts, Penicillin, Dairy, Pollen etc"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.TEXTAREA}
                            name="currentMedication"
                            label="Current Medication (if any)"
                            placeholder="Ibuprofen 200mg, Paracetamol 500mg etc"
                        />
                    </div>

                    <div className="flex flex-col gap-6 xl:flex-row">
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.TEXTAREA}
                            name="familyMedicalHistory"
                            label="Family medical history"
                            placeholder="Father had diabetes, mother has Hay Fever"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldTypes.TEXTAREA}
                            name="pastMedicalHistory"
                            label="Past medical history"
                            placeholder="Appendectomy, Tonsillectomy"
                        />
                    </div>
                </fieldset>

                <fieldset className="space-y-6">
                    <h2 className="sub-header mb-3">Identification & Verification</h2>

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.SELECT}
                        name="identificationType"
                        label="Identification Type"
                        placeholder="Select identification type"
                    >
                        {IdentificationTypes.map((type) => (
                            <SelectItem
                                key={type}
                                value={type}
                                className="hover:bg-dark-500 cursor-pointer"
                            >
                                {type}
                            </SelectItem>
                        ))}
                    </CustomFormField>

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.INPUT}
                        name="identificationNumber"
                        label="Identification number"
                        placeholder="123456789"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.SKELETON}
                        name="identificationDocument"
                        label="Upload document"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <FileUploader files={field.value} onChange={field.onChange} />
                            </FormControl>
                        )}
                    />
                </fieldset>

                <fieldset>
                    <h2 className="sub-header mb-3">Consent & Privacy</h2>

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.CHECKBOX}
                        name="treatmentConsent"
                        label="I consent to treatment"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.CHECKBOX}
                        name="disclosureConsent"
                        label="I consent to disclosure of information"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldTypes.CHECKBOX}
                        name="privacyConsent"
                        label="I consent to privacy policy"
                    />
                </fieldset>

                <CustomSubmitButton isLoading={isLoading}>Get Started</CustomSubmitButton>
            </form>
        </Form>
    );
};

export default PatientForm;
