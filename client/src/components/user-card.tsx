import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface User {
  id: number;
  username: string;
  name?: string;
  specialization?: string;
  avatar?: string;
  points: number;
  rating?: number;
}

export function UserCard({ user }: { user: User }) {
  const getInitials = (name?: string) => {
    if (!name) return "BB";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow p-6 flex flex-col items-center text-center">
      <Avatar className="h-24 w-24 mb-4">
        <AvatarImage src={user.avatar || ""} alt={user.username} />
        <AvatarFallback className="text-xl">{getInitials(user.name || user.username)}</AvatarFallback>
      </Avatar>
      <h3 className="text-lg font-medium text-gray-900">{user.name || user.username}</h3>
      <div className="mt-1 text-sm text-gray-500">{user.specialization || "Beta Tester"}</div>
      <div className="mt-3 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-primary">
        {user.points} Points
      </div>
      {user.rating && (
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <Star className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400 fill-current" />
          <span>{user.rating.toFixed(1)} Average Rating</span>
        </div>
      )}
    </div>
  );
}
