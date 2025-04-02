import { Link } from "wouter";

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-50 to-blue-100 overflow-hidden">
      {/* Floating bubbles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-indigo-200 opacity-20"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Build Better Apps</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                  With Real Feedback
                </span>
              </h1>
              
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-600 sm:text-xl md:mt-5 md:max-w-3xl lg:mx-0">
                BetaBuddy turns app testing into a party! 🎉 Connect with awesome testers, get genuine feedback, and launch with confidence.
              </p>
              
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="rounded-md shadow hover:scale-105 transform transition duration-300">
                  <Link href="/submit-app">
                    <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 md:py-4 md:text-lg md:px-10 cursor-pointer">
                      Submit Your App 🚀
                    </div>
                  </Link>
                </div>
                <div className="rounded-md shadow hover:scale-105 transform transition duration-300">
                  <Link href="/discover">
                    <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 cursor-pointer">
                      Browse Apps 🔍
                    </div>
                  </Link>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6">
                <div className="flex items-center">
                  <div className="flex -space-x-2 overflow-hidden">
                    {[1, 2, 3].map((i) => (
                      <img 
                        key={i}
                        className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                        src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${i+20}.jpg`}
                        alt=""
                      />
                    ))}
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Join 1,000+ happy devs
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-16 lg:mt-0 lg:w-1/2 relative">
              <div className="relative mx-auto w-full max-w-md rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-purple-500 opacity-70"></div>
                <div className="relative px-8 py-12 bg-white bg-opacity-10 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white bg-opacity-20 mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Beta Testing Made Fun!</h3>
                    <p className="text-indigo-100 mb-6">
                      "BetaBuddy helped us find 50+ testers in 2 days!" - Happy Developer
                    </p>
                    <div className="animate-bounce">
                      <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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