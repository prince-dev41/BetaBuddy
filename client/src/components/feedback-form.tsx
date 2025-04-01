import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Star, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const feedbackSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  content: z.string().min(30, "Feedback must be at least 30 characters"),
});

type FeedbackFormValues = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  appId: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function FeedbackForm({ appId, onClose, onSuccess }: FeedbackFormProps) {
  const { toast } = useToast();
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      content: "",
    },
  });

  const feedbackMutation = useMutation({
    mutationFn: async (values: FeedbackFormValues) => {
      const res = await apiRequest("POST", `/api/apps/${appId}/feedback`, values);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! You've earned points for testing this app.",
      });
      onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Error submitting feedback",
        description: error.message || "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: FeedbackFormValues) => {
    feedbackMutation.mutate(values);
  };

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
    form.setValue("rating", rating);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
          <DialogDescription>
            Share your experience and help the developer improve their application. Your feedback will earn you points!
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center space-x-1 py-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="focus:outline-none"
                          onMouseEnter={() => setHoverRating(rating)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => handleStarClick(rating)}
                        >
                          <Star
                            className={`h-8 w-8 transition-colors ${
                              (hoverRating || selectedRating) >= rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription className="text-center">
                    {selectedRating === 0 ? (
                      "Click to rate"
                    ) : (
                      <>
                        {selectedRating === 1 && "Poor"}
                        {selectedRating === 2 && "Below Average"}
                        {selectedRating === 3 && "Average"}
                        {selectedRating === 4 && "Good"}
                        {selectedRating === 5 && "Excellent"}
                      </>
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please share your experience with this application. What worked well? What could be improved? Did you encounter any bugs or issues?"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Detailed, constructive feedback is most helpful for developers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={feedbackMutation.isPending}
                className="flex items-center gap-2"
              >
                {feedbackMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Submit Feedback
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
