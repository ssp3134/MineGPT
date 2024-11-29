"use client";

import * as z from "zod";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from 'axios';

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const [query, setQuery]=useState('');
const [response, setResponse]=useState('');

const SingleChatPage = () => {
  const pathname = usePathname();

  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Prompt is required.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => 
  {
    console.log(values);
    try {
      const res = await axios.post('http://127.0.0.1:8000/query', {
        query: values,
      });
      
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div>
      <Heading
        title={pathname?.slice(6) || "default"}
        description=""
        icon={MessageSquare}
        iconColor="text-secondary"
        bgColor="bg-primary"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                rounded-lg 
                border 
                w-full 
                p-4
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
                "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Ask me query pretaining to to various Acts, Rules, and Regulations applicable to Mining industries."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">Message Content</div>
      </div>
    </div>
  );
};

export default SingleChatPage;
