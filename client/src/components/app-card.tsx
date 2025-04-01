import { Link } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface App {
  id: number;
  title: string;
  type: string;
  shortDescription?: string;
  description: string;
  screenshots?: string[];
  rewardPoints: number;
  testerCount: number;
  developer?: {
    id: number;
    username: string;
    name?: string;
    avatar?: string;
  };
}

export function AppCard({ app }: { app: App }) {
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
    <div className="app-card bg-white rounded-lg border border-gray-200 overflow-hidden shadow">
      {app.screenshots && app.screenshots.length > 0 ? (
        <img 
          className="h-48 w-full object-cover" 
          src={app.screenshots[0]} 
          alt={`${app.title} screenshot`} 
        />
      ) : (
        <div className="h-48 w-full bg-gradient-to-r from-indigo-100 to-indigo-200 flex items-center justify-center">
          <svg 
            className="h-24 w-24 text-indigo-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
            />
          </svg>
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{app.title}</h3>
            <p className="text-sm text-gray-500">{app.type} Application</p>
          </div>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
            +{app.rewardPoints} pts
          </span>
        </div>
        <p className="mt-3 text-gray-600">{app.shortDescription || app.description.substring(0, 100)}...</p>
        <div className="mt-4 flex justify-between items-center">
          {app.developer && (
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={app.developer.avatar || ""} alt={app.developer.username} />
                <AvatarFallback>{getInitials(app.developer.name || app.developer.username)}</AvatarFallback>
              </Avatar>
              <span className="ml-2 text-sm text-gray-600">
                {app.developer.name || app.developer.username}
              </span>
            </div>
          )}
          <div className="text-sm text-gray-500">{app.testerCount} testers</div>
        </div>
        <div className="mt-5">
          <Link href={`/apps/${app.id}`}>
            <a className="block w-full bg-primary hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded text-center">
              Test Now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
