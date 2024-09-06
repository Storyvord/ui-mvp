import UserAvatar from "./Avatar";
import { Button } from "@/components/ui/button";

export default function ChatHeader() {
  return (
    <div className="p-4 flex border-b items-center">
      <div className="flex items-center gap-2">
        <UserAvatar src="/placeholder-user.jpg" alt="Sofia Davis's Image" fallback="OM" />
        <div className="grid gap-0.5">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-xs text-muted-foreground">Active 2h ago</p>
        </div>
      </div>
      <div className="flex items-center gap-1 ml-auto">

      </div>
    </div>
  );
}
