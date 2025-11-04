"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {signIn} from 'next-auth/react'
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.email("invalid email").nonempty("Email is required"),
  password: z
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&].{6,}$/,
      "invalid password"
    ),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const  searchParams = useSearchParams();
  const callbackURL = searchParams.get('callback-url');
  console.log(searchParams);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(false);
    const response = await signIn('credentials' , {
        callbackUrl : callbackURL ?? '/',
        redirect : true,
        email : values.email,
        password : values.password,
    })
    setIsLoading(true);
    console.log(response);
  }

  return (
    <>
      <Card className="p-6 w-sm">
        <Form {...form}>
            {searchParams.get('error') ?
             <h1 className="text-destructive text-xl text-center py-3">{searchParams.get('error')}</h1> : ''
            }
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Userpassword@123" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="cursor-pointer w-full">{isLoading && <Loader2  className="animate-spin"/>}Submit</Button>
          </form>
        </Form>
      </Card>
    </>
  );
}
