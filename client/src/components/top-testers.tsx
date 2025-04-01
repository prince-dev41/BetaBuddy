import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { UserCard } from "@/components/user-card";
import { Skeleton } from "@/components/ui/skeleton";

export function TopTesters() {
  const { data: testers, isLoading } = useQuery({
    queryKey: ["/api/testers/top"],
    queryFn: async () => {
      const res = await fetch('/api/testers/top');
      if (!res.ok) throw new Error('Failed to fetch top testers');
      return res.json();
    }
  });

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-10">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Community</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Top Beta Testers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Meet our most active contributors who are shaping the future of applications.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {testers && testers.length > 0 ? (
              testers.map((tester) => (
                <UserCard key={tester.id} user={{ ...tester, rating: 4.8 }} />
              ))
            ) : (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-500 text-lg">No testers found yet. Be the first!</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/leaderboard">
            <a className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              View Leaderboard
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
