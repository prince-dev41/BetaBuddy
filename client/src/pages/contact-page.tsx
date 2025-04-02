import { StaticPage } from "@/components/static-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    department: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, department: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll respond as soon as possible.",
      });
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
        department: ""
      });
    }, 1500);
  };

  return (
    <StaticPage 
      title="Contact Us" 
      subtitle="We'd love to hear from you. Reach out with any questions, feedback, or inquiries."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="Jane Doe" 
                    value={formState.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="jane@example.com" 
                    value={formState.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="How can we help?" 
                    value={formState.subject} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={formState.department} onValueChange={handleSelectChange}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="sales">Partnerships</SelectItem>
                      <SelectItem value="feedback">Product Feedback</SelectItem>
                      <SelectItem value="press">Press & Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Please provide as much detail as possible..." 
                  rows={5} 
                  value={formState.message} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <FaEnvelope className="mr-2 text-purple-500" /> Email Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">For general inquiries:</p>
              <a href="mailto:hello@betabuddy.com" className="text-blue-600 hover:underline">hello@betabuddy.com</a>
              
              <p className="text-gray-600 mt-4 mb-2">For support:</p>
              <a href="mailto:support@betabuddy.com" className="text-blue-600 hover:underline">support@betabuddy.com</a>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <FaPhoneAlt className="mr-2 text-purple-500" /> Call Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">Main Office:</p>
              <p className="font-medium">(415) 555-1234</p>
              
              <p className="text-gray-600 mt-4 mb-2">Support Hours:</p>
              <p>Monday - Friday: 9am - 6pm PT</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <FaMapMarkerAlt className="mr-2 text-purple-500" /> Visit Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">Headquarters:</p>
              <address className="not-italic">
                123 Innovation Street<br />
                Tech District<br />
                San Francisco, CA 94107<br />
                United States
              </address>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How quickly can I expect a response?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We strive to respond to all inquiries within 24-48 business hours. For urgent technical issues, 
                please contact our support team directly.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I request a demo of the platform?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Yes! Select "Partnerships" as the department in the contact form, and our team will reach out to 
                schedule a personalized demo for your organization.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">I'm having technical issues. What should I do?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                For the fastest support, please include details about your device, browser, and what steps led to the issue. 
                Screenshots are also helpful when applicable.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Are you open to partnership opportunities?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Absolutely! We're always looking to collaborate with other organizations. Check out our 
                <a href="/partners" className="text-blue-600 hover:underline ml-1">Partners page</a> for more information or 
                reach out through the contact form.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-center p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
        <h2 className="text-2xl font-bold mb-3">Join Our Community</h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Connect with us on social media for the latest updates, tips, and to join conversations with other 
          developers and testers in our community.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Twitter</a>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">LinkedIn</a>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">GitHub</a>
          <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Discord</a>
        </div>
      </div>
    </StaticPage>
  );
}