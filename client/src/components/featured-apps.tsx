import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AppCard } from "@/components/app-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FeaturedApps() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const { data: apps, isLoading } = useQuery({
    queryKey: ["/api/apps", selectedType],
    queryFn: async () => {
      const url = new URL('/api/apps', window.location.origin);
      url.searchParams.append('limit', '3');
      if (selectedType) {
        url.searchParams.append('type', selectedType);
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch apps');
      return res.json();
    }
  });

  const appTypes = [
    { label: "All", value: null },
    { label: "Mobile", value: "mobile" },
    { label: "Web", value: "web" },
    { label: "Desktop", value: "desktop" },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">New Releases</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Featured Applications
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Discover the latest apps seeking beta testers. Earn points by providing valuable feedback!
          </p>
        </div>
        
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-wrap space-x-3">
              {appTypes.map((type) => (
                <button
                  key={type.value ?? "all"}
                  className={`px-4 py-2 rounded-full text-sm font-medium mb-2 ${
                    selectedType === type.value
                      ? "bg-indigo-100 text-primary"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedType(type.value)}
                >
                  {type.label}
                </button>
              ))}
            </div>
            <div className="hidden md:block">
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rewards">Highest Rewards</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-6 w-1/4" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-1/3 rounded-full" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {apps && apps.length > 0 ? (
                apps.map((app) => <AppCard key={app.id} app={app} />)
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500 text-lg">No applications found in this category.</p>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link href="/discover">
              <a className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                View All Applications
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
