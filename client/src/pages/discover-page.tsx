import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AppCard } from "@/components/app-card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DiscoverPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");
  
  const { data: apps, isLoading } = useQuery({
    queryKey: ["/api/apps", selectedType],
    queryFn: async () => {
      const url = new URL('/api/apps', window.location.origin);
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

  const sortOptions = [
    { label: "Most Recent", value: "newest" },
    { label: "Most Popular", value: "popular" },
    { label: "Highest Rewards", value: "rewards" },
  ];

  // Filter and sort apps
  const filteredApps = apps?.filter((app) => {
    const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (app.shortDescription && app.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || app.type === selectedType;
    return matchesSearch && matchesType;
  }) || [];

  // Sort apps based on selected option
  const sortedApps = [...filteredApps].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "popular") {
      return b.testerCount - a.testerCount;
    } else if (sortBy === "rewards") {
      return b.rewardPoints - a.rewardPoints;
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Discover Applications
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Browse all available applications for beta testing and earn points for your feedback.
            </p>
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {appTypes.map((type) => (
                <button
                  key={type.value ?? "all"}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
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
            <div>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
              {sortedApps.length > 0 ? (
                sortedApps.map((app) => <AppCard key={app.id} app={app} />)
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500 text-lg">No applications found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
