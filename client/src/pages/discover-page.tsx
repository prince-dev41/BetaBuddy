import { useState, useCallback, useEffect } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Slider
} from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { debounce } from "lodash";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function DiscoverPage() {
  // States for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [rewardRange, setRewardRange] = useState<[number, number]>([0, 500]);
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  // Debounced search term for API call
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  
  // Update debounced search term
  const debouncedSearch = useCallback(
    debounce((value) => {
      setDebouncedSearchTerm(value);
    }, 500),
    []
  );
  
  // Update search term and trigger debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };
  
  // Count active filters
  useEffect(() => {
    let count = 0;
    if (selectedType) count++;
    if (rewardRange[0] > 0 || rewardRange[1] < 500) count++;
    if (showPopularOnly) count++;
    setActiveFiltersCount(count);
  }, [selectedType, rewardRange, showPopularOnly]);

  // Fetch apps with all filter parameters
  const { data: apps, isLoading, refetch } = useQuery({
    queryKey: ["/api/apps", selectedType, sortBy, debouncedSearchTerm, rewardRange, showPopularOnly],
    queryFn: async () => {
      const url = new URL('/api/apps', window.location.origin);
      
      // Add all filter parameters to URL
      if (selectedType) {
        url.searchParams.append('type', selectedType);
      }
      
      if (sortBy) {
        url.searchParams.append('sort', sortBy);
      }
      
      if (debouncedSearchTerm) {
        url.searchParams.append('search', debouncedSearchTerm);
      }
      
      if (rewardRange[0] > 0) {
        url.searchParams.append('minRewards', rewardRange[0].toString());
      }
      
      if (rewardRange[1] < 500) {
        url.searchParams.append('maxRewards', rewardRange[1].toString());
      }
      
      if (showPopularOnly) {
        url.searchParams.append('popular', 'true');
      }
      
      console.log("Fetching apps with URL:", url.toString());
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch apps');
      return res.json();
    }
  });

  // Reset all filters
  const resetFilters = () => {
    setSelectedType(null);
    setRewardRange([0, 500]);
    setShowPopularOnly(false);
    setSortBy("newest");
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  const appTypes = [
    { label: "All", value: null },
    { label: "Mobile", value: "mobile" },
    { label: "Web", value: "web" },
    { label: "Desktop", value: "desktop" },
  ];

  const sortOptions = [
    { label: "Most Recent", value: "newest" },
    { label: "Oldest First", value: "oldest" },
    { label: "Most Popular", value: "popular" },
    { label: "Highest Rewards", value: "rewards" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Discover Applications
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-500">
              Browse all available applications for beta testing and earn points for your feedback.
            </p>
          </div>

          <div className="mb-8 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Field */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 w-full"
                />
              </div>
              
              {/* Sort Dropdown */}
              <div className="w-full md:w-auto">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                  <SelectTrigger className="w-full md:w-[180px]">
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
              
              {/* Filter Button - Mobile Only */}
              <div className="flex md:hidden">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-1 bg-primary text-white">{activeFiltersCount}</Badge>
                  )}
                </Button>
              </div>
              
              {/* Filter Button - Desktop */}
              <div className="hidden md:block">
                <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="flex items-center justify-center gap-2"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge className="ml-1 bg-primary text-white">{activeFiltersCount}</Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Filters</h3>
                        {activeFiltersCount > 0 && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 text-xs"
                            onClick={resetFilters}
                          >
                            Reset all
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">App Type</h4>
                        <div className="flex flex-wrap gap-2">
                          {appTypes.map((type) => (
                            <button
                              key={type.value ?? "all"}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                                selectedType === type.value
                                  ? "bg-primary text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                              onClick={() => setSelectedType(type.value)}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h4 className="text-sm font-medium">Reward Points</h4>
                          <span className="text-xs text-gray-500">
                            {rewardRange[0]} - {rewardRange[1]}
                          </span>
                        </div>
                        <Slider
                          defaultValue={[0, 500]}
                          min={0}
                          max={500}
                          step={50}
                          value={rewardRange}
                          onValueChange={(value) => setRewardRange(value as [number, number])}
                          className="my-6"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="popular-only"
                          checked={showPopularOnly}
                          onCheckedChange={setShowPopularOnly}
                        />
                        <Label htmlFor="popular-only">Show popular apps only</Label>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            {/* Active filters display and chips */}
            {activeFiltersCount > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {selectedType && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Type: {selectedType}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedType(null)}
                    />
                  </Badge>
                )}
                
                {(rewardRange[0] > 0 || rewardRange[1] < 500) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Rewards: {rewardRange[0]}-{rewardRange[1]}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setRewardRange([0, 500])}
                    />
                  </Badge>
                )}
                
                {showPopularOnly && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Popular only
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setShowPopularOnly(false)}
                    />
                  </Badge>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7"
                  onClick={resetFilters}
                >
                  Clear all
                </Button>
              </div>
            )}
            
            {/* Mobile filters panel */}
            {isFilterOpen && (
              <div className="md:hidden mt-4 border-t pt-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="type">
                    <AccordionTrigger>App Type</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {appTypes.map((type) => (
                          <button
                            key={type.value ?? "all"}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              selectedType === type.value
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelectedType(type.value)}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="rewards">
                    <AccordionTrigger>Reward Points</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Min: {rewardRange[0]}</span>
                          <span className="text-sm text-gray-500">Max: {rewardRange[1]}</span>
                        </div>
                        <Slider
                          defaultValue={[0, 500]}
                          min={0}
                          max={500}
                          step={50}
                          value={rewardRange}
                          onValueChange={(value) => setRewardRange(value as [number, number])}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="popular">
                    <AccordionTrigger>Popularity</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch
                          id="mobile-popular-only"
                          checked={showPopularOnly}
                          onCheckedChange={setShowPopularOnly}
                        />
                        <Label htmlFor="mobile-popular-only">Show popular apps only</Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="flex justify-between mt-4 pt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    disabled={activeFiltersCount === 0}
                  >
                    Reset all
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply filters
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          {!isLoading && (
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {apps?.length || 0} applications
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          )}

          {/* App cards */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
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
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {apps && apps.length > 0 ? (
                apps.map((app: any) => <AppCard key={app.id} app={app} />)
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">No applications found matching your criteria.</p>
                  <Button variant="outline" onClick={resetFilters}>Clear all filters</Button>
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
