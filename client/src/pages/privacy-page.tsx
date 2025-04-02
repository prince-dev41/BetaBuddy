import { StaticPage } from "@/components/static-page";

export default function PrivacyPage() {
  return (
    <StaticPage 
      title="Privacy Policy" 
      subtitle="Last updated: April 1, 2023"
    >
      <section className="mb-8">
        <h2>Introduction</h2>
        <p>
          BetaBuddy ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you use our website and services. 
        </p>
        <p className="mt-4">
          Please read this Privacy Policy carefully. By accessing or using our platform, you acknowledge that you have read, 
          understood, and agree to be bound by all the terms outlined in this policy. If you do not agree with our policies 
          and practices, please do not use our services.
        </p>
      </section>

      <section className="mb-8">
        <h2>Information We Collect</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mt-4 mb-2">Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Register for an account</li>
              <li>Submit an application for beta testing</li>
              <li>Provide feedback on applications</li>
              <li>Contact us through our support channels</li>
              <li>Subscribe to our newsletter</li>
              <li>Apply for a job or partnership</li>
            </ul>
            <p className="mt-2">
              This information may include your name, email address, username, profile picture, and professional information.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mt-4 mb-2">Usage Data</h3>
            <p>
              We automatically collect certain information when you visit, use, or navigate our platform. This information 
              does not reveal your specific identity but may include:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Device and browser information</li>
              <li>IP address</li>
              <li>Usage patterns and interactions</li>
              <li>Referring website addresses</li>
              <li>Technical information about your connection</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mt-4 mb-2">Cookies and Similar Technologies</h3>
            <p>
              We use cookies and similar tracking technologies to collect and store information about your interactions with our 
              platform. You can control your cookie preferences through your browser settings. For more information about our use of 
              cookies, please see our <a href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a>.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2>How We Use Your Information</h2>
        <p>
          We use the information we collect for various purposes, including:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>
            <strong>Providing and improving our services:</strong> To operate our platform, deliver the services you request, 
            and enhance your user experience.
          </li>
          <li>
            <strong>Communication:</strong> To respond to your inquiries, send service-related announcements, and provide 
            customer support.
          </li>
          <li>
            <strong>Marketing and promotions:</strong> With your consent, to send you newsletters, updates, and marketing 
            communications about our services.
          </li>
          <li>
            <strong>Research and analytics:</strong> To analyze usage patterns, conduct research, and improve our platform's 
            functionality and user experience.
          </li>
          <li>
            <strong>Security and fraud prevention:</strong> To protect our platform, users, and services from unauthorized access 
            and fraudulent activities.
          </li>
          <li>
            <strong>Legal compliance:</strong> To comply with applicable laws, regulations, legal processes, or governmental requests.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2>Information Sharing and Disclosure</h2>
        <p>
          We may share your information in the following situations:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>
            <strong>With developers:</strong> When you provide feedback on an application, your information (such as username 
            and feedback content) will be shared with the developer of that application.
          </li>
          <li>
            <strong>Service providers:</strong> We may share your information with third-party vendors, service providers, 
            contractors, or agents who perform services for us.
          </li>
          <li>
            <strong>Business transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, 
            your information may be transferred as part of that transaction.
          </li>
          <li>
            <strong>Legal requirements:</strong> We may disclose your information if required to do so by law or in response to valid 
            requests by public authorities.
          </li>
          <li>
            <strong>With your consent:</strong> We may share your information with third parties when you have given us your consent to do so.
          </li>
        </ul>
        <p className="mt-4">
          We do not sell your personal information to third parties.
        </p>
      </section>

      <section className="mb-8">
        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect the security of your personal information. 
          However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure. 
          While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2>Your Rights and Choices</h2>
        <p>
          Depending on your location, you may have certain rights regarding your personal information:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>
            <strong>Access and update:</strong> You can access and update your account information through your profile settings.
          </li>
          <li>
            <strong>Data portability:</strong> You may request a copy of your personal information in a structured, commonly used, 
            and machine-readable format.
          </li>
          <li>
            <strong>Deletion:</strong> You may request the deletion of your personal information, subject to certain exceptions.
          </li>
          <li>
            <strong>Objection and restriction:</strong> You may object to or request restriction of the processing of your personal information.
          </li>
          <li>
            <strong>Withdraw consent:</strong> You can withdraw any consent you previously provided for the processing of your information.
          </li>
        </ul>
        <p className="mt-4">
          To exercise these rights, please contact us using the contact information provided at the end of this Privacy Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2>Children's Privacy</h2>
        <p>
          Our services are not intended for children under the age of 16. We do not knowingly collect personal information from 
          children under 16. If you are a parent or guardian and believe that your child has provided us with personal information, 
          please contact us immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
          on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
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