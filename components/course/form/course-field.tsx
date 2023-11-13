"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";
import { CldUploadWidgetResults } from "next-cloudinary";
import { useState } from "react";

type CourseFieldProps = {
  name: string;
  type?: "text" | "textarea" | "number" | "image";
  label?: string;
  onSubmit: (values: any) => void;
  schema: z.ZodObject<any>;
  showButton?: boolean;
  placeholder?: string;
  description: string;
  defaultValue: any;
};

export function CourseField({
  name,
  type = "text",
  label,
  schema,
  onSubmit,
  placeholder,
  description,
  defaultValue,
  showButton = true,
}: CourseFieldProps) {
  const [_, setForceRedraw] = useState(0);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValue,
  });
  const { isSubmitting } = form.formState;

  const handleSubmit = (values: z.infer<typeof schema>) => {
    onSubmit(values);
  };

  const handleUpload = (e: CldUploadWidgetResults) => {
    // @ts-ignore
    form.setValue(name, e.info?.url);
    setForceRedraw((prevState) => prevState + 1);
  };

  return (
    <Form {...form}>
      <form id={name} onSubmit={form.handleSubmit(handleSubmit)}>
        {type === "image" ? (
          <>
            {form.getValues()[name] ? (
              <Image
                className={"rounded-xl mb-3"}
                src={form.getValues()[name]}
                alt={"alt"}
                width={1000}
                height={1000}
              />
            ) : null}
            <FileUpload onUpload={handleUpload} />
          </>
        ) : (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  {type === "textarea" ? (
                    <Textarea
                      disabled={isSubmitting}
                      placeholder={placeholder}
                      {...field}
                    />
                  ) : (
                    <Input
                      disabled={isSubmitting}
                      placeholder={placeholder}
                      type={type}
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage />
                <FormDescription>{description}</FormDescription>
              </FormItem>
            )}
          />
        )}
        {showButton ? (
          <Button
            className={"ml-auto block"}
            type={"submit"}
            variant={"secondary"}
          >
            Submit
          </Button>
        ) : null}
      </form>
    </Form>
  );
}
