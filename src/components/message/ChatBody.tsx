// components/ChatBody.tsx
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  content: string;
  type: "sent" | "received";
}

export default function ChatBody() {
  const messages: Message[] = [
    { content: "Hey hope you're doing well! We should catch up sometime soon. 🙏", type: "sent" },
    { content: "Sure! I'm free this weekend if you want to grab a coffee.", type: "received" },
    { content: "Sounds good! Let's meet at the Starbucks on 5th Ave.", type: "sent" },
    { content: "I'll message you on Saturday.", type: "received" },
  ];

  return (
    <ScrollArea className="h-[calc(100vh-112px)] p-4 grid gap-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ${
            message.type === "sent" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          {message.content}
        </div>
      ))}
      <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-xl overflow-hidden text-sm ml-auto">
        {/* <img
          src="/placeholder.svg"
          alt="photo"
          width={200}
          height={150}
          className="object-cover"
          style={{ aspectRatio: "200/150", objectFit: "cover" }}
        /> */}
      </div>
    </ScrollArea>
  );
}
