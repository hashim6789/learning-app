import type React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex items-center space-x-3">
            {/* <img src="/totc-logo.svg" alt="TOTC" className="h-10" /> */}
            <span className="text-lg font-semibold">EazyDev</span>
          </div>

          <div className="w-full max-w-md">
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 py-3 rounded-l-lg bg-purple-800 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-r-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900">
                Subscribe
              </button>
            </div>
          </div>

          <div className="flex space-x-8 text-sm text-purple-300">
            <a
              href="/"
              className="hover:text-white transition-colors duration-200"
            >
              Careers
            </a>
            <a
              href="/"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/"
              className="hover:text-white transition-colors duration-200"
            >
              Terms & Conditions
            </a>
          </div>

          <div className="text-sm text-purple-400">
            © 2025 EazyDev Academy Inc.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
