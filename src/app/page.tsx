"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const Page = () => {
  const [message, setMessage] = useState(false);
  return (
    <div className=" h-screen flex flex-col items-center justify-center">
      <Button onClick={() => setMessage((prev) => !prev)}>Click Me</Button>

      {message && <p className=" mt-6 text-2xl font-semibold">Happy Coding</p>}
    </div>
  );
};

export default Page;
