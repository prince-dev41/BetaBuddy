import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { FeedbackForm } from "@/components/feedback-form";
import { AppGallery } from "@/components/app-gallery";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Star, Download, User, Clock, AlertCircle } from "lucide-react";

export default function AppDetailsPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  // Fetch app details
  const { data: app, isLoading, error } = useQuery({
    queryKey: [`/api/apps/${params.id}`],
    queryFn: async () => {
      const res = await fetch(`/api/apps/${params.id}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Application not found");
        }
        throw new Error("Failed to fetch application details");
      }
      return res.json();
    },
  });

  // Check if user is already testing this app
  const { data: testingApps } = useQuery({
    queryKey: ["/api/my/testing"],
    queryFn: async () => {
      const res = await fetch('/api/my/testing');
      if (!res.ok) throw new Error('Failed to fetch testing apps');
      return res.json();
    },
    enabled: !!user, // Only fetch if user is logged in
  });

  const isAlreadyTesting = testingApps?.some(
    (tester: { appId: number }) => tester.appId === parseInt(params.id)
  );

  const hasCompletedTesting = testingApps?.some(
    (tester: { appId: number, status: string }) => tester.appId === parseInt(params.id) && tester.status === "completed"
  );

  // Mutation to start testing an app
  const testAppMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/apps/${params.id}/test`);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You are now testing this application. Download it to get started!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/my/testing"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to start testing this app",
        variant: "destructive",
      });
    },
  });

  const handleStartTesting = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to sign in to test this application",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    testAppMutation.mutate();
  };

  const getInitials = (name?: string) => {
    if (!name) return "BB";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Determine app type icon
  const getAppTypeIcon = (type: string) => {
    switch (type) {
      case "web":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case "mobile":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case "desktop":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="py-10 container">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-2/3 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Skeleton className="h-80 w-full mb-6" />
                <Skeleton className="h-6 w-1/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div>
                <Skeleton className="h-60 w-full mb-4" />
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !app) {
    return (
      <Layout>
        <div className="py-10 container">
          <div className="max-w-4xl mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Application Not Found</h1>
            <p className="text-gray-600 mb-6">
              The application you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/discover")}>
              Browse Applications
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-10 container">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="flex items-center gap-1 text-gray-600">
                {getAppTypeIcon(app.type)}
                {app.type.charAt(0).toUpperCase() + app.type.slice(1)}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 text-green-600">
                <Star className="h-3.5 w-3.5 fill-green-500" />
                {app.averageRating ? app.averageRating.toFixed(1) : "New"}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{app.title}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={app.developer?.avatar || ""} alt={app.developer?.name || app.developer?.username} />
                  <AvatarFallback>{getInitials(app.developer?.name || app.developer?.username)}</AvatarFallback>
                </Avatar>
                <span className="ml-2 text-sm text-gray-600">
                  {app.developer?.name || app.developer?.username}
                </span>
              </div>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-600 flex items-center">
                <User className="h-4 w-4 mr-1" />
                {app.testerCount} testers
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-gray-600 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(app.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {app.screenshots && app.screenshots.length > 0 ? (
                <AppGallery screenshots={app.screenshots} className="mb-8" />
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center mb-8">
                  <p className="text-gray-500">No screenshots available</p>
                </div>
              )}

              <Tabs defaultValue="description">
                <TabsList className="mb-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="feedback">
                    Feedback ({app.feedback ? app.feedback.length : 0})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold mb-4">About this application</h3>
                    <p className="whitespace-pre-line">{app.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="feedback">
                  {app.feedback && app.feedback.length > 0 ? (
                    <div className="space-y-6">
                      {app.feedback.map((feedback: any) => (
                        <Card key={feedback.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="bg-gray-50 p-4 flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={feedback.user?.avatar || ""} alt={feedback.user?.name || feedback.user?.username} />
                                  <AvatarFallback>{getInitials(feedback.user?.name || feedback.user?.username)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-gray-900">
                                    {feedback.user?.name || feedback.user?.username}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(feedback.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="p-4 space-y-4">
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">General Feedback</h4>
                                <p className="text-gray-700 whitespace-pre-line">{feedback.content}</p>
                              </div>
                              
                              {feedback.bugs && (
                                <div>
                                  <h4 className="font-medium text-red-600 mb-2">Bugs Found</h4>
                                  <p className="text-gray-700 whitespace-pre-line">{feedback.bugs}</p>
                                </div>
                              )}
                              
                              {feedback.suggestions && (
                                <div>
                                  <h4 className="font-medium text-blue-600 mb-2">Suggestions for Improvement</h4>
                                  <p className="text-gray-700 whitespace-pre-line">{feedback.suggestions}</p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No feedback yet. Be the first to provide feedback!</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Get Started</h3>
                  
                  <div className="mb-6">
                    <div className="bg-indigo-50 text-primary font-medium rounded-lg p-3 text-center mb-3">
                      Earn {app.rewardPoints} points for testing
                    </div>
                  </div>

                  {hasCompletedTesting ? (
                    <div className="space-y-4">
                      <Button className="w-full" variant="outline" asChild>
                        <a href={app.downloadUrl} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download Again
                        </a>
                      </Button>
                      <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">
                        You've already completed testing this application and provided feedback.
                      </div>
                    </div>
                  ) : isAlreadyTesting ? (
                    <div className="space-y-4">
                      <Button className="w-full" asChild>
                        <a href={app.downloadUrl} download>
                          <Download className="mr-2 h-4 w-4" />
                          Download App
                        </a>
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => setShowFeedbackForm(true)}
                      >
                        Provide Feedback
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={handleStartTesting}
                      disabled={testAppMutation.isPending}
                    >
                      {testAppMutation.isPending ? "Starting..." : "Start Testing"}
                    </Button>
                  )}

                  <div className="mt-6 text-sm text-gray-500">
                    <p className="mb-1">After testing, you'll be able to:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Provide detailed feedback</li>
                      <li>Report bugs you encounter</li>
                      <li>Suggest improvements</li>
                      <li>Rate the application</li>
                      <li>Earn {app.rewardPoints} points</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Developer</h3>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={app.developer?.avatar || ""} alt={app.developer?.name || app.developer?.username} />
                      <AvatarFallback>{getInitials(app.developer?.name || app.developer?.username)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">
                        {app.developer?.name || app.developer?.username}
                      </p>
                      <p className="text-sm text-gray-500">
                        {app.developer?.specialization || "Developer"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {showFeedbackForm && (
          <FeedbackForm
            appId={parseInt(params.id)}
            onClose={() => setShowFeedbackForm(false)}
            onSuccess={() => {
              setShowFeedbackForm(false);
              queryClient.invalidateQueries({ queryKey: [`/api/apps/${params.id}`] });
              queryClient.invalidateQueries({ queryKey: ["/api/my/testing"] });
            }}
          />
        )}
      </div>
    </Layout>
  );
}
