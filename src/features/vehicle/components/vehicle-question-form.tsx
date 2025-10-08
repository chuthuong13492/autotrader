import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
    SubjectField,
    NameFields,
    ContactFields,
    MessageField,
    CheckboxField,
    TermsText
} from "./question-form";

const questionFormSchema = z.object({
    subject: z.string().min(1, "Please select a subject"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Please enter a valid email"),
    phone: z.string().optional(),
    message: z.string().min(1, "Message is required"),
    receiveAlerts: z.boolean().optional(),
});

type QuestionFormData = z.infer<typeof questionFormSchema>;

const initialValues: QuestionFormData = {
    subject: "This Vehicle's Availability",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "Is your Certified 2025 Toyota Camry SE listed for $29,788 still available?",
    receiveAlerts: true,
};

export function VehicleDetailForm() {
    const form = useForm<QuestionFormData>({
        resolver: zodResolver(questionFormSchema),
        defaultValues: initialValues,
        mode: "onChange",
    });

    const onSubmit = (data: QuestionFormData) => {
        // Custom phone validation chỉ khi submit
        if (data.phone && data.phone.trim() !== '') {
            const phoneRegex = /^[+]?1?[\s\-.]?[(]?[0-9]{3}[)]?[\s\-.]?[0-9]{3}[\s\-.]?[0-9]{4}$/;
            if (!phoneRegex.test(data.phone)) {
                form.setError('phone', {
                    type: 'manual',
                    message: 'Please enter a valid phone number (e.g., (123) 456-7890)'
                });
                return;
            }
        }

        // Handle form submission here
        // eslint-disable-next-line no-console
        console.log("Form submitted:", data);
    };

    return (
        <Card className="w-full gap-4 py-4">
            <CardHeader className="px-4 text-xl font-bold text-gray-900">
                Got Questions? Contact the Dealer
            </CardHeader>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="px-4">
                    <SubjectField control={form.control} />
                    <NameFields control={form.control} />
                    <ContactFields control={form.control} />
                    <MessageField control={form.control} />

                    <div className="space-y-4">
                        <TermsText />

                        {/* Submit Button */}
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                            Request Info
                        </Button>

                        {/* Price Alerts Checkbox */}
                        <CheckboxField control={form.control} />
                    </div>
                </form>
            </Form>
        </Card>
    );
}