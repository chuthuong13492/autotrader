import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Control } from "react-hook-form";

interface ContactFieldsProps {
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

export function ContactFields({ control }: ContactFieldsProps) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <FormField
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="email"
                        render={() => (
                            <FormItem>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <FormField
                        control={control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone (optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Phone" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="phone"
                        render={() => (
                            <FormItem>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>

        </>
    );
}
