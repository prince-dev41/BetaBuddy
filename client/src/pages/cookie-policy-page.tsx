import { StaticPage } from "@/components/static-page";

export default function CookiePolicyPage() {
  return (
    <StaticPage 
      title="Cookie Policy" 
      subtitle="Last updated: April 1, 2023"
    >
      <section className="mb-8">
        <h2>Introduction</h2>
        <p>
          This Cookie Policy explains how BetaBuddy ("we", "our", or "us") uses cookies and similar technologies on our 
          website and platform. This Policy should be read alongside our Privacy Policy, which explains how we use personal 
          information more broadly.
        </p>
        <p className="mt-4">
          By continuing to browse or use our website and services, you agree to our use of cookies as described in this Cookie Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
          They are widely used to make websites work more efficiently and provide information to the website owners. 
          Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you have 
          closed your browser, while session cookies are deleted as soon as you close your browser.
        </p>
      </section>

      <section className="mb-8">
        <h2>How We Use Cookies</h2>
        <p>
          We use cookies for various purposes, including:
        </p>
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Essential Cookies</h3>
            <p className="text-gray-700">
              These cookies are necessary for the website to function properly. They enable basic functions like page navigation, 
              secure areas access, and remembering your authentication status. The website cannot function properly without these cookies.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Preference Cookies</h3>
            <p className="text-gray-700">
              These cookies allow us to remember choices you make and provide enhanced, personalized features. They may be set 
              by us or by third-party providers whose services we have added to our pages.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Analytics Cookies</h3>
            <p className="text-gray-700">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. 
              This helps us improve our website structure, content, and user experience.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2">Marketing Cookies</h3>
            <p className="text-gray-700">
              These cookies are used to track visitors across websites. They are set to display targeted advertisements 
              based on your interests and online behavior.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2>Specific Cookies We Use</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="py-3 px-4 border-b">Cookie Name</th>
                <th className="py-3 px-4 border-b">Type</th>
                <th className="py-3 px-4 border-b">Purpose</th>
                <th className="py-3 px-4 border-b">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 px-4">session_id</td>
                <td className="py-3 px-4">Essential</td>
                <td className="py-3 px-4">Maintains your authenticated session</td>
                <td className="py-3 px-4">Session</td>
              </tr>
              <tr>
                <td className="py-3 px-4">auth_token</td>
                <td className="py-3 px-4">Essential</td>
                <td className="py-3 px-4">Stores authentication information</td>
                <td className="py-3 px-4">30 days</td>
              </tr>
              <tr>
                <td className="py-3 px-4">ui_preferences</td>
                <td className="py-3 px-4">Preference</td>
                <td className="py-3 px-4">Remembers your interface preferences</td>
                <td className="py-3 px-4">1 year</td>
              </tr>
              <tr>
                <td className="py-3 px-4">_ga</td>
                <td className="py-3 px-4">Analytics</td>
                <td className="py-3 px-4">Google Analytics - Distinguishes users</td>
                <td className="py-3 px-4">2 years</td>
              </tr>
              <tr>
                <td className="py-3 px-4">_gid</td>
                <td className="py-3 px-4">Analytics</td>
                <td className="py-3 px-4">Google Analytics - Distinguishes users (24h)</td>
                <td className="py-3 px-4">24 hours</td>
              </tr>
              <tr>
                <td className="py-3 px-4">_fbp</td>
                <td className="py-3 px-4">Marketing</td>
                <td className="py-3 px-4">Facebook Pixel - Used to deliver advertisements</td>
                <td className="py-3 px-4">3 months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2>Third-Party Cookies</h2>
        <p>
          Some cookies are placed by third parties on our website. These third parties may include:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>
            <strong>Analytics providers</strong> (such as Google Analytics) to help us understand how users interact with our website.
          </li>
          <li>
            <strong>Marketing and advertising partners</strong> to help us deliver relevant advertisements and track their effectiveness.
          </li>
          <li>
            <strong>Social media platforms</strong> (such as Facebook, Twitter, and LinkedIn) to enable content sharing and engagement features.
          </li>
        </ul>
        <p className="mt-4">
          These third parties may use cookies, web beacons, and similar technologies to collect information about your use of our 
          website and other websites. This information may be used to provide measurement services, target advertisements, and track 
          your activity across multiple websites.
        </p>
      </section>

      <section className="mb-8">
        <h2>Managing Cookies</h2>
        <p>
          Most web browsers allow you to manage your cookie preferences. You can:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>
            <strong>Delete cookies:</strong> You can delete all cookies that are already on your device by clearing the browsing history of your browser.
          </li>
          <li>
            <strong>Block cookies:</strong> You can set your browser to block cookies. However, this may impact your experience, as some parts of our website may not function properly.
          </li>
          <li>
            <strong>Cookie preferences:</strong> Many browsers allow you to specifically accept or reject different types of cookies.
          </li>
        </ul>
        <p className="mt-4">
          Here are links to instructions for managing cookies in common browsers:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
        </ul>
        <p className="mt-4">
          To opt out of being tracked by Google Analytics across all websites, visit: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://tools.google.com/dlpage/gaoptout</a>
        </p>
      </section>

      <section className="mb-8">
        <h2>Do Not Track Signals</h2>
        <p>
          Some browsers have a "Do Not Track" feature that signals to websites that you visit that you do not want to have your 
          online activity tracked. We currently do not respond to "Do Not Track" signals, as there is no common industry standard 
          for their interpretation.
        </p>
      </section>

      <section className="mb-8">
        <h2>Changes to This Cookie Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy 
          on this page and updating the "Last updated" date. You are advised to review this Cookie Policy periodically for any changes.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about our use of cookies, please contact us at:
        </p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p>Email: <a href="mailto:privacy@betabuddy.com" className="text-blue-600 hover:underline">privacy@betabuddy.com</a></p>
          <p className="mt-2">
            Postal address: BetaBuddy, 123 Innovation Street, Tech District, San Francisco, CA 94107, United States
          </p>
        </div>
      </section>
    </StaticPage>
  );
}