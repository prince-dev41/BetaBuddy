import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { UserCard } from "@/components/user-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Medal } from "lucide-react";

export default function LeaderboardPage() {
  const [view, setView] = useState<string>("grid");

  const { data: topTesters, isLoading } = useQuery({
    queryKey: ["/api/testers/top", 20],
    queryFn: async () => {
      const res = await fetch('/api/testers/top?limit=20');
      if (!res.ok) throw new Error('Failed to fetch top testers');
      return res.json();
    }
  });

  const getInitials = (name?: string) => {
    if (!name) return "BB";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-700";
    return "text-gray-700";
  };

  const getRankMedal = (rank: number) => {
    if (rank === 1) return <Medal className="h-5 w-5 text-yellow-500 fill-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400 fill-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-700 fill-amber-700" />;
    return rank;
  };

  return (
    <Layout>
      <div className="py-10 container">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Leaderboard
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Meet our most active beta testers who are shaping the future of applications.
          </p>
        </div>

        <div>
          <div className="flex justify-end mb-6">
            <Tabs value={view} onValueChange={setView} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="table">Table</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            view === "grid" ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg shadow p-6">
                    <div className="flex flex-col items-center text-center">
                      <Skeleton className="h-24 w-24 rounded-full mb-4" />
                      <Skeleton className="h-6 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-1/3 mb-3" />
                      <Skeleton className="h-6 w-1/3 rounded-full mb-3" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <Skeleton className="h-[600px] w-full" />
              </div>
            )
          ) : (
            <>
              {topTesters && topTesters.length > 0 ? (
                <Tabs value={view} className="w-full">
                  <TabsContent value="grid" className="mt-0">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {topTesters.map((tester: any, index: number) => (
                        <div key={tester.id} className="relative">
                          <div className="absolute top-2 left-2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow">
                            <span className={`font-bold ${getRankColor(index + 1)}`}>
                              {index + 1}
                            </span>
                          </div>
                          <UserCard 
                            user={{ 
                              ...tester, 
                              rating: 4.8 - (index * 0.05) 
                            }} 
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="table" className="mt-0">
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-16">Rank</TableHead>
                            <TableHead>Tester</TableHead>
                            <TableHead>Specialization</TableHead>
                            <TableHead className="text-right">Points</TableHead>
                            <TableHead className="text-right">Rating</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {topTesters.map((tester: any, index: number) => (
                            <TableRow key={tester.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center justify-center">
                                  {getRankMedal(index + 1)}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={tester.avatar || ""} alt={tester.username} />
                                    <AvatarFallback>{getInitials(tester.name || tester.username)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{tester.name || tester.username}</div>
                                    <div className="text-xs text-gray-500">@{tester.username}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{tester.specialization || "Beta Tester"}</TableCell>
                              <TableCell className="text-right font-semibold">{tester.points}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end">
                                  <span className="mr-1">{(4.8 - (index * 0.05)).toFixed(1)}</span>
                                  <svg className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                  </svg>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500 text-lg">No testers found yet. Be the first!</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-12 bg-indigo-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">How to Climb the Leaderboard</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Find Apps</h3>
              <p className="text-gray-600 text-sm">Browse and select applications that match your interests and expertise.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Test Thoroughly</h3>
              <p className="text-gray-600 text-sm">Spend time using the application and identify areas for improvement.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Give Detailed Feedback</h3>
              <p className="text-gray-600 text-sm">Provide constructive, actionable feedback to help developers improve.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
