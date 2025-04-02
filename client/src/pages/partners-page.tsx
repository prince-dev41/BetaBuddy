import { StaticPage } from "@/components/static-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FaMicrosoft, 
  FaSlack, 
  FaFigma,
  FaAtlassian,
  FaDigitalOcean
} from "react-icons/fa";
import { 
  SiAsana, 
  SiNotion,
  SiAdobeacrobatreader as FaAdobe
} from "react-icons/si";

// Sample partners
const partners = [
  {
    name: "Microsoft",
    icon: <FaMicrosoft className="h-12 w-12 text-gray-700" />,
    description: "Partnering on enterprise beta testing solutions",
    partnerSince: "2022"
  },
  {
    name: "Adobe",
    icon: <FaAdobe className="h-12 w-12 text-gray-700" />,
    description: "Integrated creative app testing solutions",
    partnerSince: "2022"
  },
  {
    name: "Atlassian",
    icon: <FaAtlassian className="h-12 w-12 text-gray-700" />,
    description: "Jira and Confluence integrations for feedback management",
    partnerSince: "2022"
  },
  {
    name: "Slack",
    icon: <FaSlack className="h-12 w-12 text-gray-700" />,
    description: "Real-time feedback notifications and team collaboration",
    partnerSince: "2023"
  },
  {
    name: "Asana",
    icon: <SiAsana className="h-12 w-12 text-gray-700" />,
    description: "Task management integration for feedback implementation",
    partnerSince: "2023"
  },
  {
    name: "Notion",
    icon: <SiNotion className="h-12 w-12 text-gray-700" />,
    description: "Documentation and feedback organization tools",
    partnerSince: "2023"
  },
  {
    name: "Figma",
    icon: <FaFigma className="h-12 w-12 text-gray-700" />,
    description: "Design feedback and collaboration workflows",
    partnerSince: "2023"
  },
  {
    name: "DigitalOcean",
    icon: <FaDigitalOcean className="h-12 w-12 text-gray-700" />,
    description: "Infrastructure partner for global testing deployment",
    partnerSince: "2023"
  }
];

// Partnership program benefits
const benefits = [
  {
    title: "Technical Integration",
    description: "Connect your products and services with the BetaBuddy platform through our API and integration tools",
    icon: "🔌"
  },
  {
    title: "Co-Marketing",
    description: "Joint marketing campaigns, case studies, and promotional content to reach new audiences",
    icon: "📣"
  },
  {
    title: "Early Access",
    description: "Preview and provide input on upcoming BetaBuddy features and platform updates",
    icon: "🚀"
  },
  {
    title: "Partner Portal",
    description: "Access exclusive resources, training materials, and partnership management tools",
    icon: "🔑"
  }
];

export default function PartnersPage() {
  return (
    <StaticPage 
      title="Partner With BetaBuddy" 
      subtitle="Join our ecosystem of technology and service partners to enhance the beta testing experience"
    >
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Current Partners</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 flex flex-col items-center text-center">
                <div className="mb-4">{partner.icon}</div>
                <CardTitle>{partner.name}</CardTitle>
                <Badge variant="outline" className="mt-1">Partner since {partner.partnerSince}</Badge>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{partner.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Partnership Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <div className="text-center mb-2">
                <span className="inline-block text-3xl">💻</span>
              </div>
              <CardTitle className="text-center text-purple-800">Technology Partners</CardTitle>
              <CardDescription className="text-center text-purple-600">
                For companies developing tools and platforms for developers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>API access for deep integrations</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Co-branded testing initiatives</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Joint marketing opportunities</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom testing solutions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
            <CardHeader>
              <div className="text-center mb-2">
                <span className="inline-block text-3xl">🏢</span>
              </div>
              <CardTitle className="text-center text-blue-800">Service Partners</CardTitle>
              <CardDescription className="text-center text-blue-600">
                For consultancies and agencies serving software companies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Reseller opportunities</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Partner certification program</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Client management dashboard</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Training and enablement</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-yellow-50 border-green-200">
            <CardHeader>
              <div className="text-center mb-2">
                <span className="inline-block text-3xl">🎓</span>
              </div>
              <CardTitle className="text-center text-green-800">Education Partners</CardTitle>
              <CardDescription className="text-center text-green-600">
                For universities, bootcamps, and educational institutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Academic licenses</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Curriculum integration</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Student testing programs</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Research collaboration</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Partner Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex space-x-4 p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="text-3xl">{benefit.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Partnership Process</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-purple-200"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row">
              <div className="flex-1 md:text-right md:pr-8 pb-8 md:pb-0">
                <h3 className="text-xl font-semibold text-purple-800">Initial Inquiry</h3>
                <p className="mt-2 text-gray-600">
                  Submit your partnership application through our online form, providing details about your company and partnership interests.
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold">
                1
              </div>
              <div className="flex-1 md:pl-8 md:mt-0 mt-2"></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row">
              <div className="flex-1 md:text-right md:pr-8 md:hidden"></div>
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold">
                2
              </div>
              <div className="flex-1 md:pl-8 pb-8 md:pb-0">
                <h3 className="text-xl font-semibold text-purple-800">Exploratory Discussion</h3>
                <p className="mt-2 text-gray-600">
                  Our partnerships team will reach out to schedule a call to discuss your goals, potential collaboration opportunities, and mutual benefits.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row">
              <div className="flex-1 md:text-right md:pr-8 pb-8 md:pb-0">
                <h3 className="text-xl font-semibold text-purple-800">Partnership Proposal</h3>
                <p className="mt-2 text-gray-600">
                  Based on our discussion, we'll create a customized partnership proposal outlining specific initiatives, integration points, and expected outcomes.
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold">
                3
              </div>
              <div className="flex-1 md:pl-8 md:mt-0 mt-2"></div>
            </div>
            
            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row">
              <div className="flex-1 md:text-right md:pr-8 md:hidden"></div>
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold">
                4
              </div>
              <div className="flex-1 md:pl-8">
                <h3 className="text-xl font-semibold text-purple-800">Agreement & Onboarding</h3>
                <p className="mt-2 text-gray-600">
                  Once terms are finalized, we'll complete the formal agreement and begin the onboarding process, including technical integration planning if applicable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Partner With BetaBuddy?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join our network of partners and help shape the future of beta testing and user feedback. 
            We're looking for innovative companies who share our passion for creating better software.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-full">
            Apply for Partnership
          </button>
        </div>
      </section>
    </StaticPage>
  );
}