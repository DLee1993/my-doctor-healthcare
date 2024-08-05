"use client";

import Image from "next/image";
import { E164Number } from "libphonenumber-js/core";
import "react-phone-number-input/style.css";

import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import { Control } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export enum FormFieldTypes {
    INPUT = "input",
    PHONE_INPUT = "phoneInput",
    TEXTAREA = "textarea",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
}

type CustomProps = {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
    fieldType: FormFieldTypes;
};

//- Here we render the custom form field based on the props passed into the CustomFormField
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    switch (props.fieldType) {
        case FormFieldTypes.INPUT:
            return (
                <div className="flex justify-center items-center rounded-md border border-dark-500 bg-dark-400">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || "icon"}
                            className="ml-2 w-5 h-5"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={props.placeholder}
                            {...field}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            );
        case FormFieldTypes.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry="GB"
                        placeholder={props.placeholder}
                        international
                        withCountryCallingCode
                        smartCaret
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className="input-phone"
                    />
                </FormControl>
            );
        // case FormFieldTypes.TEXTAREA:
        //     return (
        //         <FormControl>
        //             <Textarea
        //                 placeholder={props.placeholder}
        //                 {...field}
        //                 className="shad-textArea"
        //                 disabled={props.disabled}
        //             />
        //         </FormControl>
        //     );
        // case FormFieldTypes.CHECKBOX:
        //     return (
        //         <FormControl>
        //             <div className="flex items-center gap-4">
        //                 <Checkbox
        //                     id={props.name}
        //                     checked={field.value}
        //                     onCheckedChange={field.onChange}
        //                 />
        //                 <label htmlFor={props.name} className="checkbox-label">
        //                     {props.label}
        //                 </label>
        //             </div>
        //         </FormControl>
        //     );
        // case FormFieldTypes.DATE_PICKER:
        //     return (
        //         <div className="flex rounded-md border border-dark-500 bg-dark-400">
        //             <Image
        //                 src="/assets/icons/calendar.svg"
        //                 height={24}
        //                 width={24}
        //                 alt="user"
        //                 className="ml-2"
        //             />
        //             <FormControl>
        //                 <ReactDatePicker
        //                     showTimeSelect={props.showTimeSelect ?? false}
        //                     selected={field.value}
        //                     onChange={(date: Date) => field.onChange(date)}
        //                     timeInputLabel="Time:"
        //                     dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
        //                     wrapperClassName="date-picker"
        //                 />
        //             </FormControl>
        //         </div>
        //     );
        // case FormFieldTypes.SELECT:
        //     return (
        //         <FormControl>
        //             <Select onValueChange={field.onChange} defaultValue={field.value}>
        //                 <FormControl>
        //                     <SelectTrigger className="shad-select-trigger">
        //                         <SelectValue placeholder={props.placeholder} />
        //                     </SelectTrigger>
        //                 </FormControl>
        //                 <SelectContent className="shad-select-content">
        //                     {props.children}
        //                 </SelectContent>
        //             </Select>
        //         </FormControl>
        //     );
        case FormFieldTypes.SKELETON:
            return props.renderSkeleton ? props.renderSkeleton(field) : null;
        default:
            return null;
    }
};

// - The return houses the form item which all fields need, from there we render the dynamic form field
const CustomFormField = (props: CustomProps) => {
    const { control, name, label } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <div className="flex gap-2 h-5">
                        {props.fieldType !== FormFieldTypes.CHECKBOX && label && (
                            <FormLabel className="shad-input-label">{label}</FormLabel>
                        )}
                        <FormMessage className="shad-error" />
                    </div>
                    <RenderField field={field} props={props} />
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;
