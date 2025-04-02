import { StaticPage } from "@/components/static-page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample team members data
const teamMembers = [
  {
    name: "Emma Stevens",
    role: "Founder & CEO",
    avatar: null,
    bio: "Former software developer with 12+ years of experience in product development. Emma founded BetaBuddy to bridge the gap between developers and users.",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    avatar: null,
    bio: "Full-stack developer with a passion for creating tools that make developers' lives easier. Michael leads our technology vision and implementation.",
  },
  {
    name: "Sarah Johnson",
    role: "Head of Community",
    avatar: null,
    bio: "Community builder with experience in developer relations. Sarah works to create a thriving ecosystem of testers and developers.",
  },
  {
    name: "James Wilson",
    role: "Lead Designer",
    avatar: null,
    bio: "UX specialist focused on creating intuitive and accessible experiences. James ensures BetaBuddy is easy and enjoyable to use.",
  }
];

export default function AboutPage() {
  return (
    <StaticPage 
      title="About BetaBuddy" 
      subtitle="Our mission is to help create better software through collaborative testing"
    >
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <div className="space-y-4">
          <p>
            BetaBuddy was born out of frustration. As developers ourselves, we experienced firsthand the challenges of finding reliable beta testers, 
            collecting structured feedback, and turning that feedback into actionable improvements.
          </p>
          
          <p>
            In 2023, we set out to create a platform that would connect developers with enthusiastic testers who could provide valuable insights. 
            Our goal was to make the beta testing process more efficient, more accessible, and more rewarding for everyone involved.
          </p>
          
          <p>
            Today, BetaBuddy is helping developers of all sizes—from independent creators to established teams—refine their applications through 
            real-world testing and feedback. We're proud to be a part of the software development process, contributing to the creation of more 
            user-friendly, reliable, and innovative applications.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-purple-800">Quality Over Quantity</h3>
            <p className="text-gray-700">
              We believe in thoughtful, detailed feedback rather than volume. Our platform is designed to encourage 
              in-depth testing and comprehensive reports that provide real value to developers.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">Community Collaboration</h3>
            <p className="text-gray-700">
              The best software is built with input from diverse perspectives. We foster a community where developers 
              and testers work together, sharing knowledge and building relationships.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-yellow-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-green-800">Fair Recognition</h3>
            <p className="text-gray-700">
              We believe testers should be recognized for their contributions. Our points system ensures that valuable 
              feedback is rewarded, acknowledging the important role testers play in the development process.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-red-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-3 text-yellow-800">Continuous Improvement</h3>
            <p className="text-gray-700">
              Just as we help developers improve their applications, we're constantly refining BetaBuddy based on 
              user feedback. We practice what we preach, using our own platform to make it better.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex space-x-4 p-4 border border-gray-200 rounded-lg">
              <Avatar className="h-16 w-16">
                <AvatarImage src={member.avatar || ""} alt={member.name} />
                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-indigo-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Facts & Figures</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
              2,500+
            </div>
            <div className="text-gray-600">Registered Testers</div>
          </div>
          
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
              750+
            </div>
            <div className="text-gray-600">Applications Tested</div>
          </div>
          
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
              12,000+
            </div>
            <div className="text-gray-600">Feedback Submissions</div>
          </div>
          
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <div className="text-gray-600">Developer Satisfaction</div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Join Us on Our Journey</h2>
        <p>
          We're just getting started with BetaBuddy, and we have big plans for the future. As we grow, we're committed to 
          maintaining our focus on quality, community, and creating value for both developers and testers.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <a href="/careers" className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg text-center">
            Join Our Team
          </a>
          <a href="/partners" className="inline-block bg-white border border-purple-500 text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-lg text-center">
            Become a Partner
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="mb-6">
          Have questions, suggestions, or just want to say hello? We'd love to hear from you!
        </p>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Get in Touch</h3>
              <p className="text-gray-600 mb-2">
                Email: <a href="mailto:hello@betabuddy.com" className="text-blue-600 hover:underline">hello@betabuddy.com</a>
              </p>
              <p className="text-gray-600 mb-2">
                Twitter: <a href="#" className="text-blue-600 hover:underline">@BetaBuddyApp</a>
              </p>
              <p className="text-gray-600">
                LinkedIn: <a href="#" className="text-blue-600 hover:underline">BetaBuddy</a>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Headquarters</h3>
              <p className="text-gray-600">
                123 Innovation Street<br />
                Tech District<br />
                San Francisco, CA 94107<br />
                United States
              </p>
            </div>
          </div>
        </div>
      </section>
    </StaticPage>
  );
}