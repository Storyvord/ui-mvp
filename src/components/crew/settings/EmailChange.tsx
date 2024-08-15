import Loader from "@/components/Loader";
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
import React from "react";
import { useForm } from "react-hook-form";

const EmailChange = ({formFields}:{formFields: any}) => {
  const form = useForm();
  const isLoading = false;
  const onSubmit = (data: any) => {};
  return (
    <div className=" mt-4 p-4 rounded-lg sm:w-full max-w-[700px] sm:mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 justify-center flex flex-col"
        >
          {formFields.map((fieldConfig:any) => {
            const { name, type, label, placeholder } = fieldConfig;
            return (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans font-bold text-gray-600">{label}</FormLabel>
                    <FormControl>
                      <Input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        value={field.value as string} // Ensure value is string
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader /> : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EmailChange;
