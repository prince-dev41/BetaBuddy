import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AppCard } from "@/components/app-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Loader2 } from "lucide-react";

export default function MyAppsPage() {
  const [activeTab, setActiveTab] = useState("developed");
  
  // Fetch apps developed by the user
  const { 
    data: developedApps, 
    isLoading: isLoadingDeveloped 
  } = useQuery({
    queryKey: ["/api/my/apps"],
    queryFn: async () => {
      const res = await fetch('/api/my/apps');
      if (!res.ok) throw new Error('Failed to fetch developed apps');
      return res.json();
    }
  });

  // Fetch apps being tested by the user
  const { 
    data: testingApps, 
    isLoading: isLoadingTesting 
  } = useQuery({
    queryKey: ["/api/my/testing"],
    queryFn: async () => {
      const res = await fetch('/api/my/testing');
      if (!res.ok) throw new Error('Failed to fetch testing apps');
      return res.json();
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              My Applications
            </h1>
            <Link href="/submit-app">
              <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700">
                Submit New App
              </a>
            </Link>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="developed">Apps I've Developed</TabsTrigger>
              <TabsTrigger value="testing">Apps I'm Testing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="developed">
              {isLoadingDeveloped ? (
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
                <>
                  {developedApps && developedApps.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {developedApps.map((app) => (
                        <AppCard key={app.id} app={app} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <h3 className="mt-2 text-xl font-medium text-gray-900">No applications yet</h3>
                      <p className="mt-1 text-sm text-gray-500">Get started by submitting your first application.</p>
                      <div className="mt-6">
                        <Link href="/submit-app">
                          <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700">
                            Submit New App
                          </a>
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            
            <TabsContent value="testing">
              {isLoadingTesting ? (
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
                <>
                  {testingApps && testingApps.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {testingApps.map((tester) => (
                        <div key={tester.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow">
                          {tester.app && (
                            <>
                              {tester.app.screenshots && tester.app.screenshots.length > 0 ? (
                                <img 
                                  className="h-48 w-full object-cover" 
                                  src={tester.app.screenshots[0]} 
                                  alt={`${tester.app.title} screenshot`} 
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
                                    <h3 className="text-lg font-bold text-gray-900">{tester.app.title}</h3>
                                    <p className="text-sm text-gray-500">{tester.app.type} Application</p>
                                  </div>
                                  <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
                                    tester.status === "completed" 
                                      ? "bg-green-100 text-green-800"
                                      : "bg-yellow-100 text-yellow-800"
                                  }`}>
                                    {tester.status === "completed" ? "Completed" : "Testing"}
                                  </span>
                                </div>
                                <p className="mt-3 text-gray-600">
                                  {tester.app.shortDescription || tester.app.description.substring(0, 100)}...
                                </p>
                                <div className="mt-4 flex justify-between items-center">
                                  {tester.app.developer && (
                                    <div className="flex items-center">
                                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        {tester.app.developer.avatar ? (
                                          <img 
                                            src={tester.app.developer.avatar} 
                                            alt={tester.app.developer.username}
                                            className="h-8 w-8 rounded-full" 
                                          />
                                        ) : (
                                          <span className="text-xs font-medium">
                                            {(tester.app.developer.name || tester.app.developer.username).substring(0, 2).toUpperCase()}
                                          </span>
                                        )}
                                      </div>
                                      <span className="ml-2 text-sm text-gray-600">
                                        {tester.app.developer.name || tester.app.developer.username}
                                      </span>
                                    </div>
                                  )}
                                  <div className="text-sm text-gray-500">+{tester.app.rewardPoints} pts</div>
                                </div>
                                <div className="mt-5">
                                  <Link href={`/apps/${tester.app.id}`}>
                                    <a className={`block w-full font-medium py-2 px-4 rounded text-center ${
                                      tester.status === "completed"
                                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        : "bg-primary hover:bg-indigo-700 text-white"
                                    }`}>
                                      {tester.status === "completed" ? "View Details" : "Continue Testing"}
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <h3 className="mt-2 text-xl font-medium text-gray-900">No applications being tested</h3>
                      <p className="mt-1 text-sm text-gray-500">Start testing apps to earn points and provide valuable feedback.</p>
                      <div className="mt-6">
                        <Link href="/discover">
                          <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-indigo-700">
                            Browse Applications
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
