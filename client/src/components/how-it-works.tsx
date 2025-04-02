export function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Sign Up & Play",
      description: "Create your free account as a developer, tester (or both!). Set up your profile with your interests and expertise. It's quick and easy! 🎮",
      icon: "👋",
      color: "from-purple-400 to-purple-600"
    },
    {
      number: 2,
      title: "Match & Connect",
      description: "Developers submit their apps for testing. Testers browse and select apps that match their interests. It's like Tinder for app testing! ❤️",
      icon: "💞",
      color: "from-pink-400 to-pink-600"
    },
    {
      number: 3,
      title: "Earn & Level Up",
      description: "Testers provide feedback and earn points/rewards. Developers get actionable insights to level up their apps. Everyone wins! 🏆",
      icon: "🚀",
      color: "from-indigo-400 to-indigo-600"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 py-16 overflow-hidden relative">
      {/* Floating decorations - toned down */}
      <div className="hidden lg:block absolute right-10 top-1/4 opacity-10">
        <svg className="w-32 h-32 text-indigo-300 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-semibold tracking-wide uppercase">
            Simple as 1-2-3!
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How BetaBuddy Works
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Join thousands of developers and testers in our playful community. Let's build better apps together! ✨
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div 
              key={step.number} 
              className="relative group"
            >
              {/* Card container with consistent height */}
              <div className="h-full flex flex-col">
                {/* Card with proper padding and spacing */}
                <div className="relative flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100 group-hover:shadow-xl transition duration-300 overflow-hidden">
                  {/* Floating circle background - now properly contained */}
                  <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-gradient-to-r opacity-10 group-hover:opacity-20 transition duration-300 from-indigo-400 to-purple-400"></div>
                  
                  {/* Icon badge - positioned within card bounds */}
                  <div className={`relative z-10 mb-6 flex items-center justify-center h-14 w-14 rounded-full text-white text-3xl bg-gradient-to-r ${step.color} shadow-md`}>
                    {step.icon}
                  </div>
                  
                  {/* Content with proper spacing */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Large number - now properly positioned */}
                  <div className="absolute bottom-2 right-2 text-6xl font-bold text-gray-100 group-hover:text-gray-200 transition duration-300 -z-0">
                    0{step.number}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA button with better contrast and spacing */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-full shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            Ready to join the fun? Sign up now!
            <svg className="ml-3 -mr-1 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}