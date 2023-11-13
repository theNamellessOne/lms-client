"use client";

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
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { chapterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { CldUploadWidgetResults } from "next-cloudinary";
import { handleChapterPost } from "@/service/chapter-service";
import { Textarea } from "@/components/ui/textarea";

export default function CreateChapterPage({
  params,
}: {
  params: { id: string };
}) {
  const form = useForm<z.infer<typeof chapterSchema>>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: "",
      videoUrl: "",
      description: "",

      position: 0,
      courseId: +params.id,
    },
  });
  const { isSubmitting } = form.formState;

  const handleSubmit = (values: z.infer<typeof chapterSchema>) => {
    handleChapterPost(values);
  };

  const handleUpload = (e: CldUploadWidgetResults) => {
    // @ts-ignore
    form.setValue("url", e.info?.url);
  };

  return (
    <Form {...form}>
      <form id={"chapterForm"} onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder={"title"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>Chapter Title.</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder={"chapter description..."}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>Chapter Description.</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder={"title"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>Chapter Title.</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder={"title"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>Chapter Title.</FormDescription>
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
  );
}
