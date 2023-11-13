"use client";

import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { FileUpload } from "@/components/file-upload";
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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidgetResults } from "next-cloudinary";
import { attachmentSchema } from "@/lib/schemas";
import { handleAttachmentPost } from "@/service/attachmnet-service";

export function AttachmentCreate({ courseId }: { courseId: number }) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof attachmentSchema>>({
    resolver: zodResolver(attachmentSchema),
    defaultValues: {
      name: "",
      url: "",
      courseId: courseId,
    },
  });
  const { isSubmitting } = form.formState;

  const handleSubmit = (values: z.infer<typeof attachmentSchema>) => {
    handleAttachmentPost(values);
  };

  const handleUpload = (e: CldUploadWidgetResults) => {
    // @ts-ignore
    form.setValue("url", e.info?.url);
  };

  return (
    <>
      <div className={"flex items-center justify-between"}>
        <p className={"text-lg"}>Attachments</p>
        <Button
          variant={"ghost"}
          onClick={() => setOpen(!open)}
          className={"my-3"}
        >
          {open ? (
            <>
              <X className={"mr-3"} size={20} />
              exit
            </>
          ) : (
            <>
              <Plus className={"mr-3"} size={20} />
              Add
            </>
          )}
        </Button>
      </div>

      {open ? (
        <Form {...form}>
          <form
            id={"attachmentform"}
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={"name"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>Attachment Name.</FormDescription>
                </FormItem>
              )}
            />
            <FileUpload type={"all"} onUpload={handleUpload} />
            <Button
              className={"ml-auto block"}
              type={"submit"}
              variant={"secondary"}
            >
              Submit
            </Button>
          </form>
        </Form>
      ) : null}
    </>
  );
}
