import { Link } from "wouter";

export function CTASection() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between relative z-10">
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block">Ready to test or submit?</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-pink-200">
              Join the fun today!
            </span>
          </h2>
          <p className="mt-3 max-w-md mx-auto text-lg text-indigo-100 sm:text-xl md:mt-5 md:max-w-3xl lg:mx-0">
            Be part of our growing community of developers and testers. Let's create amazing apps together! 🚀
          </p>
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start lg:mt-0 lg:flex-shrink-0">
          <div className="rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <Link href="/auth">
              <a className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition duration-300">
                Get started now
                <svg className="ml-3 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                </svg>
              </a>
            </Link>
          </div>
          
          <div className="rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
            <Link href="#how-it-works">
              <a className="w-full flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-lg text-white bg-transparent hover:bg-white hover:bg-opacity-10 transition duration-300">
                How it works
                <svg className="ml-3 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}