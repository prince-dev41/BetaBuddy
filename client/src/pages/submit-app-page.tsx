import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Layout } from "@/components/layout";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, UploadCloud } from "lucide-react";

const submitAppSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  shortDescription: z
    .string()
    .max(150, "Short description must be less than 150 characters")
    .optional(),
  description: z.string().min(30, "Description must be at least 30 characters"),
  type: z.enum(["web", "mobile", "desktop"], {
    required_error: "Please select an application type",
  }),
  rewardPoints: z
    .number()
    .min(50, "Minimum reward is 50 points")
    .max(500, "Maximum reward is 500 points"),
});

type SubmitAppFormValues = z.infer<typeof submitAppSchema>;

export default function SubmitAppPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [appFile, setAppFile] = useState<File | null>(null);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<SubmitAppFormValues>({
    resolver: zodResolver(submitAppSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      rewardPoints: 100,
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      console.log("Submitting app form data");
      
      try {
        const res = await fetch("/api/apps", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        
        console.log("Response status:", res.status);
        
        if (!res.ok) {
          const error = await res.json();
          console.error("Error response:", error);
          throw new Error(error.message || "Failed to submit app");
        }
        
        return res.json();
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/my/apps"] });
      queryClient.invalidateQueries({ queryKey: ["/api/apps"] });
      toast({
        title: "Success!",
        description: "Your application has been submitted for testing.",
      });
      navigate("/my-apps");
    },
    onError: (error: Error) => {
      toast({
        title: "Error submitting app",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAppFileChange = (files: File[]) => {
    if (files.length > 0) {
      setAppFile(files[0]);
    }
  };

  const handleScreenshotsChange = (files: File[]) => {
    if (files.length > 0) {
      setScreenshots(prev => [...prev, ...files].slice(0, 5));
    }
  };

  const removeScreenshot = (index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (values: SubmitAppFormValues) => {
    if (!appFile) {
      toast({
        title: "Missing app file",
        description: "Please upload your application file",
        variant: "destructive",
      });
      return;
    }

    if (screenshots.length === 0) {
      toast({
        title: "Missing screenshots",
        description: "Please upload at least one screenshot of your application",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    if (values.shortDescription) {
      formData.append('shortDescription', values.shortDescription);
    }
    formData.append('type', values.type);
    formData.append('rewardPoints', values.rewardPoints.toString());
    formData.append('userId', user!.id.toString());
    
    // Append app file
    formData.append('app', appFile);
    
    // Append screenshots
    screenshots.forEach(screenshot => {
      formData.append('screenshots', screenshot);
    });

    submitMutation.mutate(formData);
  };

  const nextTab = () => {
    if (activeTab === "basic") {
      // Validate basic info before moving to the next tab
      form.trigger(["title", "shortDescription", "description", "type"]);
      const hasErrors = !!form.formState.errors.title || 
                       !!form.formState.errors.shortDescription || 
                       !!form.formState.errors.description || 
                       !!form.formState.errors.type;
      
      if (!hasErrors) {
        setActiveTab("files");
      }
    } else if (activeTab === "files") {
      setActiveTab("reward");
    }
  };

  const prevTab = () => {
    if (activeTab === "files") {
      setActiveTab("basic");
    } else if (activeTab === "reward") {
      setActiveTab("files");
    }
  };

  return (
    <Layout>
      <div className="py-10 container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Submit Your Application</h1>
          <p className="mt-2 text-lg text-gray-600">
            Share your application with our community of beta testers and get valuable feedback.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit a New Application</CardTitle>
            <CardDescription>
              Fill out the form below to submit your application for beta testing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="files">Files & Screenshots</TabsTrigger>
                <TabsTrigger value="reward">Rewards</TabsTrigger>
              </TabsList>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <TabsContent value="basic" className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application Title</FormLabel>
                          <FormControl>
                            <Input placeholder="My Amazing App" {...field} />
                          </FormControl>
                          <FormDescription>
                            A clear, concise name for your application.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="shortDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Short Description</FormLabel>
                          <FormControl>
                            <Input placeholder="A brief summary of your app (max 150 chars)" {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be displayed in app cards and listings.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide a detailed description of your application, its features, and what you'd like feedback on."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Be specific about what you're looking for testers to evaluate.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select application type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="web">Web Application</SelectItem>
                              <SelectItem value="mobile">Mobile Application</SelectItem>
                              <SelectItem value="desktop">Desktop Application</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the platform your application runs on.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="button" onClick={nextTab}>
                        Next
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="files" className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Application File</h3>
                        <FileUpload
                          accept=".zip,.apk,.dmg,.exe,.msi"
                          maxFiles={1}
                          maxSize={10}
                          onFilesSelected={handleAppFileChange}
                          className="mb-2"
                        />
                        {appFile && (
                          <div className="flex items-center p-2 bg-gray-50 rounded border mt-2">
                            <div className="flex-1 truncate">{appFile.name}</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setAppFile(null)}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          Upload your application file (ZIP, APK, DMG, EXE, MSI). Max 10MB.
                        </p>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Screenshots</h3>
                        <FileUpload
                          accept="image/png,image/jpeg,image/jpg"
                          maxFiles={5}
                          maxSize={2}
                          onFilesSelected={handleScreenshotsChange}
                          className="mb-2"
                        />
                        {screenshots.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                            {screenshots.map((file, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-video bg-gray-100 rounded border overflow-hidden flex items-center justify-center">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Screenshot ${index + 1}`}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeScreenshot(index)}
                                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          Upload up to 5 screenshots of your application. PNG or JPG only. Max 2MB each.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevTab}>
                        Previous
                      </Button>
                      <Button type="button" onClick={nextTab}>
                        Next
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="reward" className="space-y-6">
                    <FormField
                      control={form.control}
                      name="rewardPoints"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reward Points</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={50}
                              max={500}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Points that testers will earn for providing feedback (50-500).
                            Higher rewards may attract more testers.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-medium text-indigo-800 mb-2">Reward Guidelines</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-indigo-700">
                        <li>Simple apps with minimal testing needs: 50-100 points</li>
                        <li>Standard applications: 100-250 points</li>
                        <li>Complex applications requiring extensive testing: 250-500 points</li>
                      </ul>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevTab}>
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        disabled={submitMutation.isPending}
                        className="flex items-center gap-2"
                      >
                        {submitMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        Submit Application
                      </Button>
                    </div>
                  </TabsContent>
                </form>
              </Form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
