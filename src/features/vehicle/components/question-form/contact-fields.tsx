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
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="Phone" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 py-2">
                <FormField
                    control={control}
                    name="email"
                    render={() => (
                        <FormItem>
                            <FormMessage />
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
        </>
    );
}
