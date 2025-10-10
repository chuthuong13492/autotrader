
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Control } from "react-hook-form";
import { SelectDropdown } from "@/components/select-dropdown";

const SUBJECT_OPTIONS = [
    { label: "This Vehicle's Availability", value: "This Vehicle's Availability" },
    { label: "More Information", value: "More Information" },
    { label: "Schedule a Test Drive", value: "Schedule a Test Drive" },
    { label: "Vehicle History Report", value: "Vehicle History Report" },
];

interface SubjectFieldProps {
    control: Control<{
        subject: string;
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        message: string;
        receiveAlerts?: boolean;
    }>;
}

export function SubjectField({ control }: SubjectFieldProps) {
    return (
        <FormField
        control={control}
        name="subject"
        render={({ field }) => (
            <FormItem>
                <FormLabel>Subject</FormLabel>
                <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    items={SUBJECT_OPTIONS}
                    className="text-sm w-full"
                />

                <FormMessage />
            </FormItem>
        )}
    />
    );
}
