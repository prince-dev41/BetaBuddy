import { StaticPage } from "@/components/static-page";

export default function TestingGuidelinesPage() {
  return (
    <StaticPage 
      title="Testing Guidelines" 
      subtitle="Follow these best practices to provide effective feedback for developers"
    >
      <section>
        <h2>Effective Beta Testing Practices</h2>
        <p>
          Beta testing is a critical phase in software development where real users interact with pre-release applications to identify issues, 
          provide feedback, and help developers improve the product before public release. The following guidelines will help you become a 
          more effective beta tester on BetaBuddy.
        </p>
      </section>

      <section className="mt-8">
        <h2>Before You Begin Testing</h2>
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <h3 className="font-medium text-blue-800">Read Documentation First</h3>
            <p className="text-blue-700">
              Take time to read any provided documentation, including the app description, testing goals, and known issues. 
              Understanding what the developer expects will help you focus your testing efforts.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <h3 className="font-medium text-blue-800">Understand the Target Audience</h3>
            <p className="text-blue-700">
              Consider who the app is designed for and try to evaluate it from that perspective, even if you're not 
              necessarily part of that target audience.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
            <h3 className="font-medium text-blue-800">Prepare Your Testing Environment</h3>
            <p className="text-blue-700">
              Make sure your device meets the minimum requirements. Document your device details, operating system version, 
              browser (if applicable), and other relevant specifications.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2>During Testing</h2>
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <h3 className="font-medium text-green-800">Be Methodical</h3>
            <p className="text-green-700">
              Test the application systematically. Explore all features, navigate through different screens, and 
              try various user flows to ensure comprehensive coverage.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <h3 className="font-medium text-green-800">Document Everything</h3>
            <p className="text-green-700">
              Take detailed notes as you test. Record what you did, what you expected to happen, and what actually happened. 
              Include timestamps if relevant.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <h3 className="font-medium text-green-800">Capture Visual Evidence</h3>
            <p className="text-green-700">
              Take screenshots or screen recordings of issues you encounter. Visual evidence helps developers 
              understand and reproduce the problem more easily.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <h3 className="font-medium text-green-800">Try Edge Cases</h3>
            <p className="text-green-700">
              Don't just test the happy path. Try unusual inputs, rapid interactions, slow networks, or other 
              edge cases that might reveal issues.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2>Writing Effective Feedback</h2>
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
            <h3 className="font-medium text-purple-800">Be Specific and Detailed</h3>
            <p className="text-purple-700">
              Vague feedback like "it doesn't work" isn't helpful. Provide specific details about what you tried, 
              what happened, and how it differs from what you expected.
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
            <h3 className="font-medium text-purple-800">Make Issues Reproducible</h3>
            <p className="text-purple-700">
              Include step-by-step instructions so developers can reproduce the issue. If a bug happens inconsistently, 
              note that and include any patterns you've observed.
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
            <h3 className="font-medium text-purple-800">Categorize Your Feedback</h3>
            <p className="text-purple-700">
              Distinguish between bugs (something isn't working as intended), usability issues (something is confusing or difficult), 
              and feature suggestions (ideas for improvements).
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
            <h3 className="font-medium text-purple-800">Be Constructive, Not Critical</h3>
            <p className="text-purple-700">
              Focus on how things can be improved rather than simply criticizing. Remember that developers have put 
              significant effort into their product.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2>After Testing</h2>
        <p>
          After completing your testing session, organize your notes and submit comprehensive feedback through the 
          BetaBuddy feedback form. Be open to follow-up questions from developers who may need additional information.
        </p>
      </section>

      <div className="mt-12 p-6 bg-indigo-50 rounded-xl text-center">
        <h2 className="text-2xl font-bold text-indigo-800 mb-2">Ready to Start Testing?</h2>
        <p className="text-indigo-700 mb-4">
          Apply these guidelines to provide valuable feedback and earn points while helping developers create better software.
        </p>
        <a href="/discover" className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full">
          Browse Available Apps
        </a>
      </div>
    </StaticPage>
  );
}