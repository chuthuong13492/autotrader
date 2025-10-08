import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Control } from "react-hook-form";

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
        <div className="pb-4">
            <FormField
                control={control}
                name="subject"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="This Vehicle's Availability">This Vehicle's Availability</SelectItem>
                                <SelectItem value="Vehicle Information">Vehicle Information</SelectItem>
                                <SelectItem value="Financing Options">Financing Options</SelectItem>
                                <SelectItem value="Test Drive">Test Drive</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
