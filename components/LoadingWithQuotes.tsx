import React, { useState, useEffect } from 'react';

interface LoadingWithQuotesProps {
  message?: string;
}

const motivationalQuotes = [
  "Every cigarette you don't smoke is improving your health.",
  "You're stronger than your cravings. You've got this!",
  "One day at a time. You're building a healthier future.",
  "Your lungs are already starting to heal. Keep going!",
  "Breaking free from smoking is the best gift you can give yourself.",
  "You're not giving up something good, you're gaining something better - your health.",
  "Every craving that passes makes you stronger.",
  "Your body is thanking you for every smoke-free moment.",
  "Freedom from smoking means freedom to breathe easily.",
  "You're proving to yourself that you have incredible willpower.",
  "Each smoke-free day is a victory worth celebrating.",
  "Your future self will thank you for quitting today.",
  "You're investing in years of better health and happiness.",
  "Breaking the habit means breaking free to live fully.",
  "You're choosing life over cigarettes - that's powerful!",
  "Every moment smoke-free is a step toward a healthier you.",
  "Your determination is stronger than any addiction.",
  "You're rewriting your story - smoke-free and proud!",
  "Clean air feels better than any cigarette ever did.",
  "You're not just quitting smoking, you're starting living."
];

const LoadingWithQuotes: React.FC<LoadingWithQuotesProps> = ({ 
  message = "Loading..." 
}) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
    }, 3000); // Change quote every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
        
        <p className="text-lg font-semibold text-gray-800 mb-4">{message}</p>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <p className="text-sm text-gray-600 mb-2">💪 Stay Motivated</p>
          <p 
            key={currentQuote} 
            className="text-base font-medium text-gray-800 italic animate-fade-in"
          >
            "{motivationalQuotes[currentQuote]}"
          </p>
        </div>
        
        <div className="flex justify-center mt-4 space-x-1">
          {motivationalQuotes.slice(0, 5).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentQuote % 5 ? 'bg-blue-600' : 'bg-blue-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingWithQuotes;