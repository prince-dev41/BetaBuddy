import { StaticPage } from "@/components/static-page";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "5 Ways to Get More Valuable Feedback From Beta Testers",
    excerpt: "Collecting user feedback is essential, but how do you ensure the feedback you receive is actually valuable? Learn five strategies to improve the quality of feedback from your beta testers.",
    image: "https://images.unsplash.com/photo-1591522810850-58128c5fb089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "April 28, 2023",
    author: {
      name: "Emma Stevens",
      role: "Founder & CEO",
      avatar: null
    },
    categories: ["Beta Testing", "User Feedback"],
    readTime: "7 min read"
  },
  {
    id: 2,
    title: "The Psychology of User Testing: Understanding Tester Motivations",
    excerpt: "What motivates people to participate in beta testing? This post explores the psychological factors that drive beta testers and how to leverage them for better results.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "March 15, 2023",
    author: {
      name: "Dr. Rebecca Lang",
      role: "UX Research Consultant",
      avatar: null
    },
    categories: ["Psychology", "User Research"],
    readTime: "9 min read"
  },
  {
    id: 3,
    title: "Case Study: How SuperApp Improved Conversion Rates by 35% Through Beta Testing",
    excerpt: "Learn how one of our clients used targeted beta testing to identify critical UX issues and dramatically improve their conversion rates before launch.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "February 22, 2023",
    author: {
      name: "Michael Chen",
      role: "CTO",
      avatar: null
    },
    categories: ["Case Study", "Success Stories"],
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "Building a Culture of Feedback: Tips for Development Teams",
    excerpt: "Creating a team culture that embraces and effectively processes feedback is crucial for product success. Discover strategies for integrating user feedback into your development process.",
    image: "https://images.unsplash.com/photo-1528901166007-3784c7dd3653?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "January 10, 2023",
    author: {
      name: "Sarah Johnson",
      role: "Head of Community",
      avatar: null
    },
    categories: ["Team Culture", "Product Development"],
    readTime: "8 min read"
  },
  {
    id: 5,
    title: "The Future of Beta Testing: Trends and Predictions for 2023 and Beyond",
    excerpt: "From AI-powered testing to specialized tester communities, explore the emerging trends that are shaping the future of beta testing and user feedback collection.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "December 12, 2022",
    author: {
      name: "Emma Stevens",
      role: "Founder & CEO",
      avatar: null
    },
    categories: ["Industry Trends", "Future of Testing"],
    readTime: "10 min read"
  },
  {
    id: 6,
    title: "How to Write Effective Testing Instructions for Beta Testers",
    excerpt: "Clear instructions are critical for successful beta testing. Learn how to create testing scenarios that guide testers without biasing their feedback.",
    image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: "November 5, 2022",
    author: {
      name: "James Wilson",
      role: "Lead Designer",
      avatar: null
    },
    categories: ["Best Practices", "Documentation"],
    readTime: "7 min read"
  }
];

// Categories for filtering
const categories = [
  "All Posts",
  "Beta Testing",
  "User Feedback",
  "Case Study",
  "Best Practices",
  "Industry Trends",
  "Team Culture",
  "Product Development"
];

export default function BlogPage() {
  return (
    <StaticPage 
      title="BetaBuddy Blog" 
      subtitle="Insights, tips, and stories about beta testing and product development"
    >
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <Badge 
              key={index} 
              variant={index === 0 ? "default" : "outline"}
              className={`cursor-pointer ${index === 0 ? 'bg-gradient-to-r from-purple-600 to-blue-500' : 'hover:bg-gray-100'}`}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <Link href={`#post-${blogPosts[0].id}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="aspect-[2/1] w-full overflow-hidden">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardHeader className="pb-0">
              <div className="flex flex-wrap gap-2 mb-3">
                {blogPosts[0].categories.map((cat, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {cat}
                  </Badge>
                ))}
              </div>
              <h3 className="text-2xl font-bold hover:text-purple-700 transition-colors">
                {blogPosts[0].title}
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{blogPosts[0].excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={blogPosts[0].author.avatar || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700">
                    {blogPosts[0].author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{blogPosts[0].author.name}</div>
                  <div className="text-sm text-gray-500">{blogPosts[0].author.role}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {blogPosts[0].date} • {blogPosts[0].readTime}
              </div>
            </CardFooter>
          </Card>
        </Link>
      </div>

      {/* Rest of the blog posts in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post) => (
          <Link key={post.id} href={`#post-${post.id}`}>
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="aspect-video w-full overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-0">
                <div className="flex flex-wrap gap-1 mb-2">
                  {post.categories.map((cat, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200 text-xs">
                      {cat}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-lg font-bold hover:text-purple-700 line-clamp-2 transition-colors">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t pt-3 text-sm">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={post.author.avatar || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 text-purple-700 text-xs">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{post.author.name}</div>
                </div>
                <div className="text-gray-500">
                  {post.readTime}
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-16 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Stay updated with the latest insights, tips, and news about beta testing, user feedback, and product development.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg">
            Subscribe
          </button>
        </div>
      </div>
    </StaticPage>
  );
}