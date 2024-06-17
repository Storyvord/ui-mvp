import { taskFormType, taskType } from '@/types'
import { FC } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../../../../components/ui/dialog'
import { Button } from '../../../../../../components/ui/button'
import { Input } from '../../../../../../components/ui/input'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../../../components/ui/form'
import { Textarea } from '../../../../../../components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { taskFormSchema } from '@/lib/validation'

interface CreateTaskProps {
  taskEditing?: taskType,
  formOpen: boolean,
  handleSubmission: (newTask: taskFormType) => void,
  setFormOpen: (value: boolean) => void
}


const CreateTask: FC<CreateTaskProps> = ({taskEditing, formOpen, handleSubmission, setFormOpen}) => {

    const defaultData= taskEditing ? {
        title: taskEditing.title,
        desc: taskEditing.desc,
        deadline: taskEditing.deadline,
    }: {
        title: "",
        desc: "",
        deadline: "2023-06-01",
    };

    const form = useForm<taskFormType>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: defaultData,
    })

    function onSubmit(formData: taskFormType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
          handleSubmission(formData);
          setFormOpen(!formOpen)
          console.log(formData)
          form.reset()
        } catch (e) {
          form.setError("root", {type: 'manual', message:"Form submission failed"});
          console.error(e);
        }
      }
    
  return (
    <Dialog open={formOpen} onOpenChange={()=>setFormOpen(!formOpen)}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{defaultData ? "Edit Task" : "Create Task"}</DialogTitle>
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
                                Task Title
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter task title"
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
                        name="desc"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-sans font-bold text-gray-600">
                                Task Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Enter task description"
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
                        name="deadline"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-sans font-bold text-gray-600">
                                Task Deadline
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    {...field}
                                    className="block focus-visible:ring-0 focus-visible:ring-offset-0  focus:shadow-[rgb(38,132,255)_0_0_0_1px] focus:border-[rgb(38,132,255)]"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
  )
}

export default CreateTask