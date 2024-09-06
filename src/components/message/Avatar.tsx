import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  src: string;
  alt: string;
  fallback: string;
}

export default function UserAvatar({ src, alt, fallback }: UserAvatarProps) {
  return (
    <Avatar className="border w-10 h-10">
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
