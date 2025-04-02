import { StaticPage } from "@/components/static-page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

// Sample forum categories and discussions
const forumCategories = [
  {
    id: 1,
    name: "General Discussion",
    description: "General discussions about beta testing and software development",
    icon: "💬",
    color: "bg-blue-100 text-blue-800",
    threadCount: 124,
    recentThreads: [
      {
        id: 101,
        title: "Best ways to incentivize beta testers?",
        author: {
          name: "DevLead42",
          avatar: null,
          role: "Developer"
        },
        replies: 28,
        views: 342,
        lastActivity: "2 hours ago"
      },
      {
        id: 102,
        title: "How to write effective testing instructions",
        author: {
          name: "UXMaster",
          avatar: null,
          role: "Developer"
        },
        replies: 15,
        views: 187,
        lastActivity: "1 day ago"
      }
    ]
  },
  {
    id: 2,
    name: "Beta Testing Strategies",
    description: "Share and discuss strategies for effective beta testing",
    icon: "🎯",
    color: "bg-green-100 text-green-800",
    threadCount: 86,
    recentThreads: [
      {
        id: 201,
        title: "Closed vs. open beta testing: Pros and cons",
        author: {
          name: "TestManager",
          avatar: null,
          role: "Developer"
        },
        replies: 42,
        views: 513,
        lastActivity: "3 hours ago"
      },
      {
        id: 202,
        title: "How many testers do you need for meaningful feedback?",
        author: {
          name: "AppDev23",
          avatar: null,
          role: "Developer"
        },
        replies: 31,
        views: 276,
        lastActivity: "2 days ago"
      }
    ]
  },
  {
    id: 3,
    name: "Feedback Implementation",
    description: "Discussions about how to effectively implement user feedback",
    icon: "🔄",
    color: "bg-purple-100 text-purple-800",
    threadCount: 67,
    recentThreads: [
      {
        id: 301,
        title: "Prioritizing contradictory user feedback",
        author: {
          name: "ProductManager",
          avatar: null,
          role: "Developer"
        },
        replies: 19,
        views: 245,
        lastActivity: "5 hours ago"
      },
      {
        id: 302,
        title: "When to ignore user feedback (and when not to)",
        author: {
          name: "DesignGuru",
          avatar: null,
          role: "Developer"
        },
        replies: 37,
        views: 412,
        lastActivity: "1 day ago"
      }
    ]
  },
  {
    id: 4,
    name: "Technical Support",
    description: "Get help with technical issues related to the BetaBuddy platform",
    icon: "🔧",
    color: "bg-red-100 text-red-800",
    threadCount: 93,
    recentThreads: [
      {
        id: 401,
        title: "API integration troubleshooting",
        author: {
          name: "Backend_Dev",
          avatar: null,
          role: "Developer"
        },
        replies: 12,
        views: 156,
        lastActivity: "1 hour ago"
      },
      {
        id: 402,
        title: "Error when uploading large screenshots",
        author: {
          name: "MobileAppDev",
          avatar: null,
          role: "Developer"
        },
        replies: 8,
        views: 124,
        lastActivity: "4 days ago"
      }
    ]
  }
];

export default function CommunityForumsPage() {
  return (
    <StaticPage 
      title="Community Forums" 
      subtitle="Connect with developers and testers to share knowledge and experiences"
    >
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Forum Categories</h2>
          <p className="text-gray-600">Browse discussions by topic or start your own thread</p>
        </div>
        <Link href="#new-thread">
          <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-lg">
            New Thread
          </button>
        </Link>
      </div>

      <div className="space-y-6">
        {forumCategories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader className={`${category.color} pb-2`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription className="text-gray-700 mt-1">{category.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="bg-white bg-opacity-70">
                  {category.threadCount} threads
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {category.recentThreads.map((thread) => (
                  <div key={thread.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <Link href={`#thread-${thread.id}`}>
                          <h3 className="font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                            {thread.title}
                          </h3>
                        </Link>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={thread.author.avatar || ""} />
                              <AvatarFallback className="bg-purple-100 text-purple-800 text-xs">
                                {thread.author.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span>{thread.author.name}</span>
                          </div>
                          <span className="mx-2">•</span>
                          <span>{thread.replies} replies</span>
                          <span className="mx-2">•</span>
                          <span>{thread.views} views</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span>Last activity: {thread.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 py-3">
              <Link href={`#category-${category.id}`}>
                <span className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View all threads in {category.name} →
                </span>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div id="new-thread" className="mt-12 p-6 border border-dashed border-gray-300 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Start a New Discussion</h2>
        <p className="text-gray-600 mb-6">
          Have a question or want to share your experience? Start a new thread to engage with the community.
        </p>
        <p className="text-gray-500 italic">
          Coming soon: Our community forums will be fully implemented in the next update.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Community Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li>Be respectful and constructive</li>
              <li>Stay on topic in each thread</li>
              <li>No promotional content</li>
              <li>Protect your personal information</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Forum Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Total Members:</span>
                <span className="font-medium">2,487</span>
              </div>
              <div className="flex justify-between">
                <span>Total Threads:</span>
                <span className="font-medium">370</span>
              </div>
              <div className="flex justify-between">
                <span>Total Posts:</span>
                <span className="font-medium">5,934</span>
              </div>
              <div className="flex justify-between">
                <span>New Today:</span>
                <span className="font-medium">28</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Moderator Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-blue-100 text-blue-800">MH</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">ModeratorHero</div>
                  <div className="text-sm text-gray-500">Lead Moderator</div>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-green-100 text-green-800">CG</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">CommunityGuide</div>
                  <div className="text-sm text-gray-500">Developer Support</div>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-purple-100 text-purple-800">TH</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">TestingHelper</div>
                  <div className="text-sm text-gray-500">Tester Support</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StaticPage>
  );
}