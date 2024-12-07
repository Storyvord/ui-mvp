"use client";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import RenderFormFields from "@/components/form-component/RenderFormFields";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useCrewProfile } from "./useCrewProfile.hook";

type Props = {
  prevStep: () => void;
  onSuccessStep: () => void;
};

const CrewProfileForm = ({ prevStep, onSuccessStep }: Props) => {
  const { form, isPending, isError, handleSubmit, CrewProfileFormFields, userProfile } =
    useCrewProfile(onSuccessStep);

  return (
    <div className="">
      <h3 className="lg:text-2xl md:text-2xl text-sm font-poppins text-center font-medium text-[#333333]">
        Let&apos;s get to know you better!
      </h3>
      <p className="text-xs lg:text-base md:text-base font-poppins text-center font-normal text-[#666666] mt-2 underline">
        Please provide your basic information to continue.
      </p>
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 justify-center flex flex-col w-full lg:w-3/5 mx-auto"
        >
          <section>
            <RenderFormFields form={form} formFields={CrewProfileFormFields} />
          </section>

          {isError && (
            <p className="text-center text-sm text-red-600 font-semibold">
              Something went wrong. Please try again.
            </p>
          )}
          <div className=" w-full flex justify-between items-center">
            <Button
              type="button"
              disabled={isPending}
              className=" flex items-center gap-3"
              onClick={prevStep}
            >
              <FaArrowLeft />
              Back
            </Button>
            <Button type="submit" disabled={isPending} className="flex items-center gap-3">
              {isPending ? (
                <Loader />
              ) : userProfile?.data?.personal_info?.full_name ? (
                "Update"
              ) : (
                "Submit"
              )}{" "}
              <FaArrowRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CrewProfileForm;
