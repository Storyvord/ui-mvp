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
import { OpenPositionFormData } from "./OpenPositionDialog";

const openPositionFormFields = [
  {
    name: "position",
    label: "Position",
    type: "text",
    placeholder: "enter position",
  },
  {
    name: "name",
    label: "Display position with the following name",
    type: "text",
    placeholder: "",
  },
  {
    name: "departments",
    label: "Departments",
    type: "text",
  },
  {
    name: "note",
    label: "Note",
    type: "textarea",
  },
];
type AnnouncementFormProps = {
  form: any;
  onSubmit: (data:OpenPositionFormData) => void; 
  isLoading: boolean;
};

const OpenPositionForm: React.FC<AnnouncementFormProps> = ({ form, onSubmit, isLoading }) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 justify-center flex flex-col"
      >
        {openPositionFormFields.map((fieldConfig) => {
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
                    {type === "text" || type === "date" ? (
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

export default OpenPositionForm;
