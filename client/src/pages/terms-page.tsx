import { StaticPage } from "@/components/static-page";

export default function TermsPage() {
  return (
    <StaticPage 
      title="Terms of Service" 
      subtitle="Last updated: April 1, 2023"
    >
      <section className="mb-8">
        <h2>Introduction</h2>
        <p>
          Welcome to BetaBuddy. These Terms of Service ("Terms") govern your access to and use of the BetaBuddy website and services 
          (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy.
        </p>
        <p className="mt-4">
          Please read these Terms carefully before using our Services. If you do not agree to these Terms, you may not access or use our Services.
        </p>
      </section>

      <section className="mb-8">
        <h2>Accounts and Registration</h2>
        <div className="space-y-4">
          <p>
            To use certain features of our Services, you may need to create an account. When registering for an account, you agree to provide 
            accurate, current, and complete information and to update this information to maintain its accuracy.
          </p>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. 
            You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
          </p>
          <p>
            We reserve the right to suspend or terminate your account if any information provided during registration or thereafter proves to be 
            inaccurate, not current, or incomplete.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2>Use of Services</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium mt-4 mb-2">For Developers</h3>
          <p>
            When submitting an application for beta testing:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>You represent that you have all necessary rights, licenses, and permissions to share your application on our platform.</li>
            <li>You grant testers the right to use your application for testing purposes.</li>
            <li>You agree to respond to and engage with tester feedback in a professional manner.</li>
            <li>You are responsible for the content and functionality of your application, including compliance with all applicable laws and regulations.</li>
          </ul>

          <h3 className="text-lg font-medium mt-4 mb-2">For Testers</h3>
          <p>
            When testing applications:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>You agree to provide constructive, honest, and respectful feedback.</li>
            <li>You will not reverse engineer, decompile, or attempt to extract the source code of any application unless explicitly permitted.</li>
            <li>You acknowledge that applications are in development and may contain bugs, errors, or other issues.</li>
            <li>You will maintain the confidentiality of any non-public information about applications you test.</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2>Content Guidelines</h2>
        <p>
          You are solely responsible for the content you submit to our Services, including application descriptions, screenshots, 
          feedback, comments, and other materials. You agree not to submit content that:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
          <li>Infringes upon or violates the intellectual property rights or other rights of any third party.</li>
          <li>Contains viruses, malware, or other harmful code.</li>
          <li>Impersonates any person or entity or falsely states or misrepresents your affiliation with a person or entity.</li>
          <li>Contains unsolicited or unauthorized advertising, promotional materials, spam, junk mail, or any other form of solicitation.</li>
        </ul>
        <p className="mt-4">
          We reserve the right to remove any content that violates these guidelines or that we determine, in our sole discretion, 
          is harmful to our Services or users.
        </p>
      </section>

      <section className="mb-8">
        <h2>Points System</h2>
        <p>
          Our platform includes a points system to incentivize and reward user participation:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Points are granted at our discretion based on activities such as providing feedback.</li>
          <li>Points have no monetary value and cannot be exchanged for cash or other consideration.</li>
          <li>We reserve the right to modify the points system at any time, including the methods for earning points and the value of points.</li>
          <li>Any attempt to manipulate the points system through fraudulent means may result in account suspension or termination.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2>Intellectual Property</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-medium mt-4 mb-2">Our Intellectual Property</h3>
          <p>
            The BetaBuddy name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of 
            BetaBuddy or its affiliates. You may not use these marks without our prior written permission.
          </p>
          <p>
            All content, features, and functionality of our Services, including but not limited to text, graphics, logos, icons, images, 
            audio clips, video clips, data compilations, and software, are the property of BetaBuddy or our licensors and are protected 
            by copyright, trademark, and other intellectual property laws.
          </p>

          <h3 className="text-lg font-medium mt-4 mb-2">Your Content</h3>
          <p>
            You retain all ownership rights in your content. By submitting content to our Services, you grant us a worldwide, non-exclusive, 
            royalty-free license to use, reproduce, modify, publish, distribute, and display such content in connection with our Services.
          </p>
          <p>
            Feedback provided by testers may be used by developers to improve their applications. By providing feedback, you grant the 
            developer a non-exclusive, perpetual, irrevocable, royalty-free license to use, modify, and incorporate your feedback into 
            their application.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2>Limitation of Liability</h2>
        <p>
          In no event shall BetaBuddy, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, 
          incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
          or other intangible losses, resulting from:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Your access to or use of or inability to access or use our Services.</li>
          <li>Any conduct or content of any third party on our Services, including without limitation, any defamatory, offensive, or illegal conduct of other users or third parties.</li>
          <li>Any content obtained from our Services.</li>
          <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
        </ul>
        <p className="mt-4">
          The foregoing limitation of liability shall apply to the fullest extent permitted by law in the applicable jurisdiction.
        </p>
      </section>

      <section className="mb-8">
        <h2>Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless BetaBuddy, its directors, employees, partners, agents, suppliers, and affiliates 
          from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable 
          attorneys' fees) arising out of or relating to your violation of these Terms or your use of our Services.
        </p>
      </section>

      <section className="mb-8">
        <h2>Modifications to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. If we make material changes to these Terms, we will notify you by 
          email or by posting a notice on our website prior to the changes becoming effective. Your continued use of our Services 
          after any such changes constitutes your acceptance of the new Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2>Termination</h2>
        <p>
          We may terminate or suspend your account and access to our Services immediately, without prior notice or liability, for any 
          reason, including without limitation if you breach these Terms. Upon termination, your right to use our Services will 
          immediately cease.
        </p>
      </section>

      <section className="mb-8">
        <h2>Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its 
          conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located in San Francisco County, California.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <p>Email: <a href="mailto:terms@betabuddy.com" className="text-blue-600 hover:underline">terms@betabuddy.com</a></p>
          <p className="mt-2">
            Postal address: BetaBuddy, 123 Innovation Street, Tech District, San Francisco, CA 94107, United States
          </p>
        </div>
      </section>
    </StaticPage>
  );
}