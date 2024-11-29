"use client";

import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { User } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface settingsSectionProps {
  currentUser?: User;
}

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  currentPassword: z.string().min(8, {
    message: "Password must be 8 or more characters long",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be 8 or more characters long",
  }),
});

const SettingsSection: React.FC<settingsSectionProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: currentUser?.email,
      currentPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // setIsLoading(true);

    // if (passwordHash == currentUser?.hashedPassword) {
    //   if (values.currentPassword === values.newPassword) {
    //     toast.error("Enter a new password");
    //   } else {
    //     axios
    //       .post("/api/change_password", values)
    //       .then(() => {
    //         toast("Password Changed Sucessfully! Please login again.");
    //         signOut();
    //         router.push("/sign-in");
    //       })
    //       .catch((error) => {
    //         toast.error("Something went wrong");
    //       })
    //       .finally(() => {
    //         setIsLoading(false);
    //       });
    //   }
    // } else {
    //   toast.error("Invalid Password!");
    // }
    console.log(values);
    toast.success("Data Sent");
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <div>
          <h2 className="text-lg font-bold">Change Password</h2>
          <Separator />
        </div>
        <div>
          <div className="mt-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="username@mail.com"
                          required={false}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Change Password
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
