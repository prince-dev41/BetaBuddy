import { useState, useRef, ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, Loader2, UserCircle } from "lucide-react";

// Mock user profile update (since we don't have a real endpoint for this yet)
// In a real app, this would call the API to update the user profile
const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  bio: z.string().max(250, "Bio must be less than 250 characters").optional(),
  specialization: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileUpdateSchema>;

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("profile");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      specialization: user?.specialization || "",
    },
  });

  // Mock avatar upload mutation
  const avatarMutation = useMutation({
    mutationFn: async (file: File) => {
      // This would normally upload the file to the server
      // For now, we'll just pretend it succeeded after a delay
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(file));
        }, 1000);
      });
    },
    onSuccess: (avatarUrl) => {
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      });
      setAvatarPreview(avatarUrl);
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "There was a problem updating your avatar.",
        variant: "destructive",
      });
    },
  });

  // Mock profile update mutation
  const profileMutation = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      // This would normally send the values to the server
      // For now, we'll just pretend it succeeded after a delay
      return new Promise<ProfileFormValues>((resolve) => {
        setTimeout(() => {
          resolve(values);
        }, 1000);
      });
    },
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    profileMutation.mutate(values);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      avatarMutation.mutate(file);
    }
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

  if (!user) {
    return null; // Should be handled by ProtectedRoute
  }

  return (
    <Layout>
      <div className="py-10 container">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                      <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                        <AvatarImage
                          src={avatarPreview || user.avatar || ""}
                          alt={user.name || user.username}
                        />
                        <AvatarFallback className="text-2xl">
                          {getInitials(user.name || user.username)}
                        </AvatarFallback>
                      </Avatar>
                      {avatarMutation.isPending && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
                          <Loader2 className="h-8 w-8 animate-spin text-white" />
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      <button
                        className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full"
                        onClick={handleAvatarClick}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                    <h3 className="text-xl font-bold">{user.name || user.username}</h3>
                    <p className="text-gray-500 text-sm">@{user.username}</p>
                    <div className="mt-2">
                      <Badge variant="secondary" className="font-normal">
                        {user.specialization || "Beta Tester"}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="text-center">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg inline-block">
                      <p className="text-xs font-medium uppercase">Your Points</p>
                      <p className="text-3xl font-bold">{user.points}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <nav>
                    <ul className="space-y-1">
                      <li>
                        <Button
                          variant={activeTab === "profile" ? "secondary" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setActiveTab("profile")}
                        >
                          <UserCircle className="mr-2 h-5 w-5" />
                          Edit Profile
                        </Button>
                      </li>
                      <li>
                        <Button
                          variant={activeTab === "account" ? "secondary" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => setActiveTab("account")}
                        >
                          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Account Settings
                        </Button>
                      </li>
                    </ul>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="w-full md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {activeTab === "profile" ? "Edit Profile" : "Account Settings"}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === "profile"
                      ? "Update your profile information"
                      : "Manage your account settings and preferences"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {activeTab === "profile" ? (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Display Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your name" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is the name that will be displayed to other users.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="specialization"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Specialization</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. UX Designer, Mobile Developer" {...field} />
                              </FormControl>
                              <FormDescription>
                                Your area of expertise or role as a developer or tester.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us a bit about yourself"
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Brief description about yourself, your interests, and expertise.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex justify-end">
                          <Button
                            type="submit"
                            disabled={profileMutation.isPending}
                            className="flex items-center gap-2"
                          >
                            {profileMutation.isPending && (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            )}
                            {profileMutation.isSuccess ? (
                              <>
                                <Check className="h-4 w-4" />
                                Saved
                              </>
                            ) : (
                              "Save Changes"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Email Address</h3>
                        <p className="text-gray-500 mb-1">Your email address is:</p>
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-md">
                          <span className="font-medium">{user.email}</span>
                          <Button variant="ghost" size="sm" className="text-primary">
                            Change
                          </Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-2">Password</h3>
                        <p className="text-gray-500 mb-4">Change your password to keep your account secure.</p>
                        <Button variant="outline" className="flex items-center gap-2">
                          Change Password
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
                        <p className="text-gray-500 mb-4">Manage how and when you receive notifications.</p>
                        <Button variant="outline" className="flex items-center gap-2">
                          Manage Notifications
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
