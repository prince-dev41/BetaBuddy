import { StaticPage } from "@/components/static-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ApiDocumentationPage() {
  return (
    <StaticPage 
      title="API Documentation" 
      subtitle="Integrate BetaBuddy's beta testing capabilities into your own development workflow"
    >
      <section className="mb-8">
        <h2>API Overview</h2>
        <p>
          BetaBuddy provides a RESTful API that allows developers to programmatically access beta testing data, 
          manage applications, and integrate feedback into your development pipeline. This documentation provides 
          details on available endpoints, authentication methods, and example implementations.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
          <p className="text-yellow-700">
            <strong>Note:</strong> The BetaBuddy API is currently in beta. We may make breaking changes as we 
            continue to develop and improve our platform. We recommend checking this documentation regularly for updates.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2>Authentication</h2>
        <p className="mb-4">
          All API requests require authentication using API keys. To obtain an API key, visit your 
          <span className="font-mono mx-1 bg-gray-100 px-1 rounded">Account Settings</span> page.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
          <h3 className="text-lg font-medium mb-2">Authentication Header</h3>
          <p className="font-mono bg-black text-white p-3 rounded overflow-x-auto">
            Authorization: Bearer YOUR_API_KEY
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2>API Endpoints</h2>
        <p>
          The following endpoints are available in the BetaBuddy API. All requests should be made to the base URL:
          <code className="block bg-gray-800 text-white p-3 rounded mt-2 font-mono">
            https://api.betabuddy.com/v1
          </code>
        </p>
      </section>

      <Tabs defaultValue="apps" className="mb-12">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="apps">Applications</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="testers">Testers</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apps" className="p-4 border rounded-md mt-2">
          <h3 className="text-xl font-bold mb-4">Applications Endpoints</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono">GET</span>
                <code className="font-mono text-gray-800">/apps</code>
              </div>
              <p className="mt-2 text-gray-600">
                Returns a list of all applications belonging to the authenticated developer.
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono">GET</span>
                <code className="font-mono text-gray-800">/apps/{"{app_id}"}</code>
              </div>
              <p className="mt-2 text-gray-600">
                Returns detailed information about a specific application.
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono">POST</span>
                <code className="font-mono text-gray-800">/apps</code>
              </div>
              <p className="mt-2 text-gray-600">
                Creates a new application for beta testing.
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-mono">PUT</span>
                <code className="font-mono text-gray-800">/apps/{"{app_id}"}</code>
              </div>
              <p className="mt-2 text-gray-600">
                Updates an existing application's details.
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-mono">DELETE</span>
                <code className="font-mono text-gray-800">/apps/{"{app_id}"}</code>
              </div>
              <p className="mt-2 text-gray-600">
                Removes an application from the platform.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="p-4 border rounded-md mt-2">
          <h3 className="text-xl font-bold mb-4">Feedback Endpoints</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono">GET</span>
                <code className="font-mono text-gray-800">/apps/{"{app_id}"}/feedback</code>
              </div>
              <p className="mt-2 text-gray-600">
                Returns all feedback submissions for a specific application.
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono">GET</span>
                <code className="font-mono text-gray-800">/feedback/{"{feedback_id}"}</code>
              </div>
              <p className="mt-2 text-gray-600">
                Returns detailed information about a specific feedback submission.
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-mono">PUT</span>
                <code className="font-mono text-gray-800">/feedback/{"{feedback_id}"}/status</code>
              </div>
              <p className="mt-2 text-gray-600">
                Updates the status of a feedback submission (e.g., acknowledged, implemented, rejected).
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="testers" className="p-4 border rounded-md mt-2">
          <h3 className="text-xl font-bold mb-4">Testers Endpoints</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono">GET</span>
                <code className="font-mono text-gray-800">/apps/{"{app_id}"}/testers</code>
              </div>
              <p className="mt-2 text-gray-600">
                Returns a list of all testers who have provided feedback for a specific application.
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono">GET</span>
                <code className="font-mono text-gray-800">/testers/{"{tester_id}"}</code>
              </div>
              <p className="mt-2 text-gray-600">
                Returns detailed information about a specific tester, including testing history.
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono">POST</span>
                <code className="font-mono text-gray-800">/apps/{"{app_id}"}/testers/{"{tester_id}"}/reward</code>
              </div>
              <p className="mt-2 text-gray-600">
                Awards bonus points to a tester for exceptional feedback.
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="webhooks" className="p-4 border rounded-md mt-2">
          <h3 className="text-xl font-bold mb-4">Webhooks</h3>
          
          <p className="mb-4">
            BetaBuddy supports webhooks to notify your systems when certain events occur, such as new feedback submissions.
          </p>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-mono">POST</span>
                <code className="font-mono text-gray-800">/webhooks</code>
              </div>
              <p className="mt-2 text-gray-600">
                Registers a new webhook endpoint.
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-mono">GET</span>
                <code className="font-mono text-gray-800">/webhooks</code>
              </div>
              <p className="mt-2 text-gray-600">
                Lists all registered webhooks.
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-sm font-mono">DELETE</span>
                <code className="font-mono text-gray-800">/webhooks/{"{webhook_id}"}</code>
              </div>
              <p className="mt-2 text-gray-600">
                Removes a registered webhook.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mb-12">
        <h2>Example Request</h2>
        <p className="mb-4">Here's an example of retrieving feedback for an application using cURL:</p>
        
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
{`curl -X GET \\
  "https://api.betabuddy.com/v1/apps/12345/feedback" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
        </pre>
      </section>

      <section className="mb-8">
        <h2>Rate Limiting</h2>
        <p>
          API requests are limited to 100 requests per minute per API key. If you exceed this limit, 
          you will receive a 429 Too Many Requests response. The response will include a Retry-After 
          header indicating how many seconds to wait before making another request.
        </p>
      </section>

      <section>
        <h2>Support</h2>
        <p>
          If you have questions or need assistance with the API, please contact our developer support team 
          at <a href="mailto:api-support@betabuddy.com" className="text-blue-600 hover:underline">api-support@betabuddy.com</a>.
        </p>
      </section>
    </StaticPage>
  );
}