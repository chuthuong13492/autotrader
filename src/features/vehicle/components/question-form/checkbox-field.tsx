import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import type { Control } from "react-hook-form";

interface CheckboxFieldProps {
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

export function CheckboxField({ control }: CheckboxFieldProps) {
    return (
        <FormField
            control={control}
            name="receiveAlerts"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                            Yes, I would like to receive price alerts on this vehicle and helpful shopping information from Autotrader & its affiliates.
                        </FormLabel>
                    </div>
                </FormItem>
            )}
        />
    );
}
