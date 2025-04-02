import { StaticPage } from "@/components/static-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { BookOpenIcon, CodeIcon, GaugeIcon, UsersIcon } from "lucide-react";

export default function DeveloperResourcesPage() {
  const resources = [
    {
      title: "Getting Started Guide",
      description: "Learn how to prepare your application for beta testing on our platform",
      icon: <BookOpenIcon className="h-8 w-8 text-purple-500" />,
      link: "#getting-started"
    },
    {
      title: "Best Practices",
      description: "Tips for collecting and implementing effective user feedback",
      icon: <GaugeIcon className="h-8 w-8 text-blue-500" />,
      link: "#best-practices"
    },
    {
      title: "Integration Tools",
      description: "API documentation and tools to integrate BetaBuddy with your development pipeline",
      icon: <CodeIcon className="h-8 w-8 text-green-500" />,
      link: "/api-documentation"
    },
    {
      title: "Community Discussions",
      description: "Connect with other developers and share experiences",
      icon: <UsersIcon className="h-8 w-8 text-orange-500" />,
      link: "/community-forums"
    }
  ];

  return (
    <StaticPage 
      title="Developer Resources" 
      subtitle="Tools and guides to help you get the most out of beta testing your applications"
    >
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <Link key={index} href={resource.link}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                  <div>{resource.icon}</div>
                  <div>
                    <CardTitle>{resource.title}</CardTitle>
                    <CardDescription className="mt-1">{resource.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section id="getting-started" className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Getting Started With BetaBuddy</h2>
        <p className="mb-4">
          Preparing your application for beta testing is a straightforward process. Follow these steps to ensure 
          a successful beta testing experience.
        </p>
        
        <div className="space-y-6 mt-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium flex items-center">
              <span className="flex items-center justify-center bg-purple-100 text-purple-800 rounded-full w-8 h-8 mr-3">1</span>
              Prepare Your Application
            </h3>
            <div className="mt-3 ml-11">
              <p className="text-gray-700">
                Ensure your application is stable enough for testing. It should have core functionality working, 
                even if some features are still under development. Create a build that's easy to install or access.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium flex items-center">
              <span className="flex items-center justify-center bg-purple-100 text-purple-800 rounded-full w-8 h-8 mr-3">2</span>
              Document Testing Goals
            </h3>
            <div className="mt-3 ml-11">
              <p className="text-gray-700">
                Define what aspects of your application you want testers to focus on. Create clear instructions 
                and consider preparing specific testing scenarios that you want feedback on.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium flex items-center">
              <span className="flex items-center justify-center bg-purple-100 text-purple-800 rounded-full w-8 h-8 mr-3">3</span>
              Submit Your Application
            </h3>
            <div className="mt-3 ml-11">
              <p className="text-gray-700">
                Use our <Link href="/submit-app"><span className="text-blue-600 hover:underline">application submission form</span></Link> to 
                upload your app. Include detailed descriptions, screenshots, and specify reward points to attract testers.
              </p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium flex items-center">
              <span className="flex items-center justify-center bg-purple-100 text-purple-800 rounded-full w-8 h-8 mr-3">4</span>
              Engage With Testers
            </h3>
            <div className="mt-3 ml-11">
              <p className="text-gray-700">
                Once testers start providing feedback, engage with them. Respond to questions, ask for clarification 
                when needed, and thank testers for their valuable input.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="best-practices" className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Best Practices for Beta Testing</h2>
        <p className="mb-6">
          Follow these industry best practices to maximize the value of your beta testing cycle.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Set Clear Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Define specific goals for your beta test (e.g., identifying usability issues, testing performance, validating features).</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Provide Context</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Give testers background information about your application, its purpose, and target audience.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Create a Feedback Loop</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Acknowledge feedback promptly and let testers know when their suggestions are implemented.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Iterate Quickly</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Address critical issues and release updated versions for further testing when appropriate.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reward Quality Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Consider offering additional rewards or recognition for testers who provide exceptional feedback.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Plan Your Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Set a clear schedule for your beta testing cycle, including when you'll review feedback and make updates.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="mt-16 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-4">Ready to Get Started?</h2>
        <p className="text-center mb-6">
          Submit your application and start collecting valuable feedback from our community of testers.
        </p>
        <div className="flex justify-center">
          <Link href="/submit-app">
            <button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full">
              Submit Your Application
            </button>
          </Link>
        </div>
      </div>
    </StaticPage>
  );
}