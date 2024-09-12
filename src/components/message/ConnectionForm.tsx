import React, { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ConnectionFormProps = {
  receiverId: string;
  setReceiverId: React.Dispatch<React.SetStateAction<string>>;
  setFilledForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConnectionForm: React.FC<ConnectionFormProps> = ({ receiverId, setReceiverId, setFilledForm }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFilledForm(true);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-xs mt-8 space-y-4">
        <Input
          type="text"
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          required
        />
        <Button type="submit">Start Chat</Button>
      </form>
    </div>
  );
};

export default ConnectionForm;
