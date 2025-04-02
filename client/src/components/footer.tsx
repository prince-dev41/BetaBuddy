import { Link } from "wouter";
import { Logo } from "@/components/ui/logo";
import { FacebookIcon, TwitterIcon, GithubIcon } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { icon: <FacebookIcon className="h-6 w-6" />, href: "#", label: "Facebook" },
    { icon: <TwitterIcon className="h-6 w-6" />, href: "#", label: "Twitter" },
    { icon: <GithubIcon className="h-6 w-6" />, href: "#", label: "GitHub" },
  ];

  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "Submit App", href: "/submit-app" },
        { label: "Browse Apps", href: "/discover" },
        { label: "Leaderboard", href: "/leaderboard" },
        { label: "Points System", href: "/points-system" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Testing Guidelines", href: "/testing-guidelines" },
        { label: "Developer Resources", href: "/developer-resources" },
        { label: "API Documentation", href: "/api-documentation" },
        { label: "Community Forums", href: "/community-forums" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Partners", href: "/partners" },
        { label: "Careers", href: "/careers" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookie Policy", href: "/cookie-policy" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <svg className="h-8 w-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path>
              </svg>
              <span className="ml-2 text-xl font-bold text-white">BetaBuddy</span>
            </div>
            <p className="text-gray-300 text-base">
              Connecting developers with real users to create better software through collaborative testing and feedback.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="text-gray-400 hover:text-gray-300"
                >
                  <span className="sr-only">{link.label}</span>
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerSections.slice(0, 2).map((section, sectionIndex) => (
                <div key={sectionIndex} className={sectionIndex === 1 ? "mt-12 md:mt-0" : ""}>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.href}>
                          <div className="text-base text-gray-300 hover:text-white cursor-pointer">
                            {link.label}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {footerSections.slice(2, 4).map((section, sectionIndex) => (
                <div key={sectionIndex} className={sectionIndex === 1 ? "mt-12 md:mt-0" : ""}>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.href}>
                          <div className="text-base text-gray-300 hover:text-white cursor-pointer">
                            {link.label}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} BetaBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
