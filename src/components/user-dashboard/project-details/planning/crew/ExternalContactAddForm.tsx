import React from "react";
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
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/components/Loader";
import { ExternalContactFormData} from "./ExternalContactDialog";

const externalContactFormFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "enter name",
  },
  {
    name: "position",
    label: "Position",
    type: "text",
    placeholder: "enter position",
  },
  {
    name: "departments",
    label: "Departments",
    type: "text",
    placeholder: "",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "phone",
    label: "Phone",
    type: "number",
  },
  {
    name: "note",
    label: "Note",
    type: "textarea",
  }
];
type Props = {
  form: any;
  onSubmit: (data:ExternalContactFormData) => void;
  isLoading: boolean;
};

const ExternalContactAddForm: React.FC<Props> = ({ form, onSubmit, isLoading }) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 justify-center flex flex-col"
      >
        {externalContactFormFields.map((fieldConfig) => {
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
                    {type === "text" || type === "date" || type === "email" || type ==="number" ? (
                      <Input
                        type={type}
                        placeholder={placeholder}
                        {...field}
                        value={field.value as string} // Ensure value is string
                      />
                    ) : type === "textarea" ? (
                      <Textarea
                        placeholder={placeholder}
                        {...field}
                        value={field.value as string}
                      />
                    ) : type === "file" ? (
                      <Input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            field.onChange(e.target.files[0]);
                          }
                        }}
                      />
                    ) : null}
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
  );
};

export default ExternalContactAddForm;
