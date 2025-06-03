"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Toaster, toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
    photo: z.any(),
})

export function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            photo: undefined,
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const file = data.photo;
        console.log("Submitted file:", file);

        if (
            file &&
            file instanceof File &&
            ["image/jpeg"].includes(file.type) &&
            file.size < 10 * 1024 * 1024 // less than 10MB
        ) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                console.log("Image uploaded successfully:", data);
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("Failed to upload image.");
            }

            toast.success("Image uploaded successfully!", {
                description: (
                    <span>
                        File: <b>{file.name}</b> ({file.type})
                    </span>
                ),
            });
        } else {
            toast.error("No valid image uploaded or file is too large (max 10MB).");
        }
    }

    return (
        <>
            <Toaster />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="photo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Upload Card Image</FormLabel>
                                <FormControl>
                                    <Input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        onChange={e => {
                                            const file = e.target.files && e.target.files[0];
                                            field.onChange(file);
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Snap a card pic to reveal its value or claim it for your collection!
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}
