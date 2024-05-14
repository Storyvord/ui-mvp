"use client";

import { Button } from "@/components/ui/button";
import Form from "@/pages/new-project/form";
import { useState } from "react";

const Page = () => {
  const [message, setMessage] = useState(false);
  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <Form/>
    </div>
  );
};

export default Page;
