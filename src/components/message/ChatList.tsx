import Link from "next/link";
import UserAvatar from "./Avatar";

interface Chat {
  name: string;
  message: string;
  time: string;
  fallback: string;
}

export default function ChatList() {
  const chats: Chat[] = [
    { name: "Sofia Davis", message: "hey what's going on?", time: "2h", fallback: "OM" },
    { name: "Alex Johnson", message: "Just finished a great book! 📚", time: "45m", fallback: "AJ" },
    { name: "Maria Gonzalez", message: "Excited for the weekend!", time: "1h", fallback: "MG" },
    { name: "Kevin Brown", message: "Who's up for a movie night?", time: "3h", fallback: "KB" },
    { name: "Lily White", message: "Morning coffee is the best! ☕", time: "30m", fallback: "LW" },
  ];

  return (
    <div className="grid gap-2">
      {chats.map((chat, index) => (
        <Link href="#" key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 bg-muted" prefetch={false}>
          <UserAvatar src="/placeholder-user.jpg" alt={`${chat.name}'s Image`} fallback={chat.fallback} />
          <div className="grid gap-0.5">
            <p className="text-sm font-medium leading-none">{chat.name}</p>
            <p className="text-xs text-muted-foreground">{chat.message} &middot; {chat.time}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
