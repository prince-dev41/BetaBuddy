import { StaticPage } from "@/components/static-page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";

// Sample open positions
const openPositions = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    description: "We're looking for an experienced frontend developer to help build and enhance our web application platform. You'll work closely with our design and product teams to create intuitive interfaces for both developers and testers.",
    requirements: [
      "5+ years experience with modern JavaScript frameworks (React preferred)",
      "Strong TypeScript skills",
      "Experience with responsive design and cross-browser compatibility",
      "Knowledge of modern frontend tooling and best practices",
      "Familiarity with UX/UI principles"
    ],
    benefits: ["Competitive salary", "Health, dental, and vision insurance", "Flexible work arrangements", "Professional development budget"],
    posted: "2 weeks ago"
  },
  {
    id: 2,
    title: "Backend Developer",
    department: "Engineering",
    location: "Remote (US)",
    type: "Full-time",
    description: "Join our backend team to develop and scale our API services and data infrastructure. You'll help ensure our platform can handle growing user demands while maintaining performance and reliability.",
    requirements: [
      "3+ years experience with Node.js/Express",
      "Strong knowledge of database design and optimization",
      "Experience with RESTful API design",
      "Understanding of security best practices",
      "Familiarity with cloud services (AWS/Azure/GCP)"
    ],
    benefits: ["Competitive salary", "Health, dental, and vision insurance", "Remote-first culture", "Home office stipend"],
    posted: "1 month ago"
  },
  {
    id: 3,
    title: "Product Marketing Manager",
    department: "Marketing",
    location: "San Francisco, CA or Remote",
    type: "Full-time",
    description: "We're seeking a product marketing manager to help tell our story, drive user acquisition, and develop positioning for our platform. You'll work at the intersection of product, marketing, and sales.",
    requirements: [
      "3+ years experience in product marketing, preferably in B2B SaaS",
      "Strong communication and storytelling skills",
      "Experience developing go-to-market strategies",
      "Data-driven approach to marketing",
      "Understanding of developer and product management audiences"
    ],
    benefits: ["Competitive salary", "Comprehensive benefits package", "Flexible work arrangements", "Professional development opportunities"],
    posted: "3 weeks ago"
  },
  {
    id: 4,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Help us create intuitive, engaging user experiences for our platform. You'll work on everything from user research to interaction design to visual refinement, ensuring our product is both powerful and easy to use.",
    requirements: [
      "3+ years experience in product design",
      "Strong portfolio demonstrating user-centered design process",
      "Proficiency with modern design tools (Figma preferred)",
      "Experience with user research and usability testing",
      "Ability to translate complex workflows into simple interfaces"
    ],
    benefits: ["Competitive salary", "Health, dental, and vision insurance", "Flexible work arrangements", "Professional development budget"],
    posted: "1 week ago"
  },
  {
    id: 5,
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "Full-time",
    description: "Join our customer success team to help developers and organizations get the most out of our platform. You'll onboard new customers, provide ongoing support, and identify opportunities to expand relationships.",
    requirements: [
      "3+ years in customer success or account management, preferably in SaaS",
      "Strong communication and relationship-building skills",
      "Ability to understand technical concepts and explain them to various audiences",
      "Experience with CRM and customer success platforms",
      "Proactive problem-solving approach"
    ],
    benefits: ["Competitive salary", "Comprehensive benefits package", "Remote-first culture", "Career advancement opportunities"],
    posted: "2 weeks ago"
  }
];

// Company values
const values = [
  {
    title: "User-Centered",
    description: "We put users at the center of everything we do, constantly seeking to understand their needs and improve their experience.",
    icon: "👥"
  },
  {
    title: "Quality-Driven",
    description: "We believe that quality matters in every detail, from the code we write to the interactions we have with our community.",
    icon: "✨"
  },
  {
    title: "Collaborative",
    description: "We work together across teams and with our users, believing that the best solutions emerge from diverse perspectives.",
    icon: "🤝"
  },
  {
    title: "Continuously Learning",
    description: "We embrace a growth mindset, always looking to improve our skills, our product, and our understanding of user needs.",
    icon: "🧠"
  }
];

export default function CareersPage() {
  return (
    <StaticPage 
      title="Careers at BetaBuddy" 
      subtitle="Join our team and help shape the future of software development and beta testing"
    >
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Work With Us</h2>
            <div className="space-y-4">
              <p>
                At BetaBuddy, we're building a platform that changes how software is tested and refined. 
                We believe that great products are created through collaboration between developers and users, 
                and we're passionate about making that process better for everyone involved.
              </p>
              <p>
                We're a small but growing team of engineers, designers, and product specialists who value 
                creativity, collaboration, and impact. We offer the excitement and growth opportunities of 
                a startup with the stability and focus of a mission-driven company.
              </p>
              <p>
                If you're excited about creating tools that help developers build better software, 
                we'd love to talk to you about joining our team.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                <div className="text-3xl mb-2">{value.icon}</div>
                <h3 className="text-lg font-semibold text-purple-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Benefits & Perks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="text-3xl mb-2">💰</div>
              <CardTitle>Competitive Compensation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Salary packages designed to attract and retain top talent, with equity options to share in our success.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="text-3xl mb-2">🏥</div>
              <CardTitle>Comprehensive Healthcare</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Medical, dental, and vision coverage for you and your dependents, with the majority of premiums covered.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="text-3xl mb-2">🏖️</div>
              <CardTitle>Flexible Time Off</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Generous PTO policy, plus company holidays and paid volunteer time to recharge and give back.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="text-3xl mb-2">🏡</div>
              <CardTitle>Remote-First Culture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Work from anywhere with flexible schedules, plus home office stipends to create your ideal workspace.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="text-3xl mb-2">📚</div>
              <CardTitle>Learning & Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Annual budget for courses, conferences, books, and other resources to help you grow professionally.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="text-3xl mb-2">💼</div>
              <CardTitle>401(k) Matching</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Retirement savings plans with company matching to help you plan for the future.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
              <CardTitle>Family-Friendly</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Generous parental leave, flexible scheduling, and support for working parents.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="text-3xl mb-2">🤝</div>
              <CardTitle>Team Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Regular virtual gatherings and annual in-person retreats to build relationships with your colleagues.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Departments</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="customer">Customer Success</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {openPositions.map((position) => (
              <JobCard key={position.id} position={position} />
            ))}
          </TabsContent>
          
          <TabsContent value="engineering" className="space-y-6">
            {openPositions.filter(p => p.department === "Engineering").map((position) => (
              <JobCard key={position.id} position={position} />
            ))}
          </TabsContent>
          
          <TabsContent value="design" className="space-y-6">
            {openPositions.filter(p => p.department === "Design").map((position) => (
              <JobCard key={position.id} position={position} />
            ))}
          </TabsContent>
          
          <TabsContent value="marketing" className="space-y-6">
            {openPositions.filter(p => p.department === "Marketing").map((position) => (
              <JobCard key={position.id} position={position} />
            ))}
          </TabsContent>
          
          <TabsContent value="customer" className="space-y-6">
            {openPositions.filter(p => p.department === "Customer Success").map((position) => (
              <JobCard key={position.id} position={position} />
            ))}
          </TabsContent>
        </Tabs>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Hiring Process</h2>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-2xl font-bold">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Application Review</h3>
              <p className="text-gray-600">
                We review your resume, portfolio (if applicable), and cover letter. We aim to respond to all applications within 1-2 weeks.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-2xl font-bold">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Initial Conversation</h3>
              <p className="text-gray-600">
                A 30-45 minute video call with a hiring manager to discuss your experience, interest in BetaBuddy, and answer any questions you have.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-2xl font-bold">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Skills Assessment</h3>
              <p className="text-gray-600">
                Depending on the role, we'll ask you to complete a short take-home project or technical interview. We design these to be fair and representative of the actual work you'd be doing.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-2xl font-bold">
              4
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Team Interviews</h3>
              <p className="text-gray-600">
                A series of conversations with team members and stakeholders, focusing on role-specific skills, collaboration, and cultural fit (typically 2-3 interviews).
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white text-2xl font-bold">
              5
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Offer & Onboarding</h3>
              <p className="text-gray-600">
                If there's a mutual fit, we'll extend an offer and work with you to ensure a smooth transition to BetaBuddy. Our comprehensive onboarding process will help you hit the ground running.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Don't See the Right Fit?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            We're always interested in connecting with talented individuals who are passionate about our mission, even if we don't have a current opening that matches your background.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-full">
            Submit General Application
          </button>
        </div>
      </section>
    </StaticPage>
  );
}

// Job Card component
function JobCard({ position }: { position: typeof openPositions[0] }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{position.title}</CardTitle>
            <CardDescription className="mt-1">{position.department} • {position.location}</CardDescription>
          </div>
          <Badge variant="secondary">{position.type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{position.description}</p>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Requirements:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm">
              {position.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {position.benefits.map((benefit, index) => (
                <Badge key={index} variant="outline" className="bg-purple-50">{benefit}</Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 flex justify-between items-center">
        <span className="text-sm text-gray-500">Posted {position.posted}</span>
        <Link href={`#job-${position.id}`}>
          <button className="py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg">
            Apply Now
          </button>
        </Link>
      </CardFooter>
    </Card>
  );
}