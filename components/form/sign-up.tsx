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
import { httpClient } from "@/lib/httpClient";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/form/input/password-input";
import { useAuth } from "@/providers/auth-provider";

const formSchema = z.object({
  email: z.string().email("Enter valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export function SignUp() {
  const { login } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isValid) {
      httpClient
        .post("/auth/sign-up", values)
        .then(login)
        .catch(() => {
          toast.error("something went wrong");
        });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="email@xample.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Your email. We won't message you too much.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={"password"}
          render={({ field }) => (
            <FormItem className={"my-3"}>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput field={field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Your password. Try not to forget it.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button className={"w-full"} disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
