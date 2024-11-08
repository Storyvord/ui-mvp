import { FC } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { taskFormSchema } from "@/lib/validation";
import RenderFormFields from "../RenderFormFields";
import { FormFieldConfig, taskFormType, taskType } from "@/types";
import { AiOutlineCalendar, AiOutlineFile, AiOutlineLink } from "react-icons/ai";

interface CreateTaskProps {
  taskEditing?: taskType;
  formOpen: boolean;
  handleSubmission: (newTask: taskFormType) => void;
  setFormOpen: (value: boolean) => void;
  crewList: { value: string; label: string }[];
  // projectList: { value: string; label: string }[];
}

const CreateTask: FC<CreateTaskProps> = ({
  taskEditing,
  formOpen,
  handleSubmission,
  setFormOpen,
  crewList = [],
  // projectList = [],
}) => {
  const formFields: FormFieldConfig<taskFormType>[] = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Please Enter Title",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Please Enter Description",
    },
    {
      name: "assigned_to",
      label: "Assigned Departments or Crew Members",
      type: "select",
      placeholder: "Please Select Shoot Location",
      options: crewList,
    },
  ];

  const defaultData: taskFormType = taskEditing
    ? {
      title: taskEditing.title,
      description: taskEditing.description,
      assigned_to: taskEditing.assigned_to,
      due_date: taskEditing.due_date,
      file: taskEditing.file,
      link_task: taskEditing.link_task,
    }
    : {
      title: "",
      description: "",
      assigned_to: 0,
      due_date: "",
      file: null,
      link_task: null,
    };

  const form = useForm<taskFormType>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: defaultData,
  });

  function onSubmit(formData: taskFormType) {
    try {
      handleSubmission(formData);
      setFormOpen(false);
    } catch (e) {
      form.setError("root", {
        type: "manual",
        message: "Form submission failed",
      });
      console.error(e);
    }
  }

  return (
    <Dialog open={formOpen} onOpenChange={() => setFormOpen(!formOpen)}>
      <DialogContent className="max-w-md w-full p-8 rounded-md">
        <DialogHeader className="flex items-start justify-between">
          <DialogTitle className="text-lg font-semibold">Create Task</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <RenderFormFields form={form} formFields={formFields} />

            <div className="flex flex-col">
              <label className="mt-3 mb-2 font-sans font-bold text-gray-800 text-md">More Options</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition cursor-pointer">
                  <AiOutlineCalendar />
                  <span>Deadline</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      // console.log("Selected Deadline File:", file);
                    }}
                  />
                </label>

                <label className="flex items-center space-x-2 px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition cursor-pointer">
                  <AiOutlineFile />
                  <span>File</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      // console.log("Selected File:", file);
                    }}
                  />
                </label>

                <label className="flex items-center space-x-2 px-3 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition cursor-pointer">
                  <AiOutlineLink />
                  <span>Link Task</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      // console.log("Selected Link Task File:", file);
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition"
              >
                Create
              </button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTask;
