import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  expirationDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  file: z.instanceof(FileList).nullable(),
  pinTop: z.boolean()
});

const defaultValues = {
  title: '',
  message: '',
  expirationDate: '',
  file: null,
  pinTop: false
};

type formType = z.infer<typeof schema>;

const CreateAnnouncementDialog = ({ openDialog, setOpenDialog }: Props) => {
  const form = useForm<formType>({
    resolver: zodResolver(schema),
    defaultValues
  });

  const onSubmit = (data: formType) => {
    console.log(data);
    return;
  };

  return (
    <Dialog open={openDialog} onOpenChange={() => setOpenDialog(!openDialog)}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Announcement details</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 justify-center flex flex-col"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans font-bold text-gray-600">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="enter title"
                      {...field}
                      className="focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans font-bold text-gray-600">
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="message"
                      {...field}
                      className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans font-bold text-gray-600">
                    Expiration Date
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="resize-none focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans font-bold text-gray-600">
                    File
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                      className=" h-20  block focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pinTop"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="terms"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Pin this announcement to the top in the project dashboard
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAnnouncementDialog;
