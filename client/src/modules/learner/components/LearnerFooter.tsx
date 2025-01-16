import { Link } from "react-router-dom";
interface FooterProps {
  className?: string;
}

// Footer Component
const LearnerFooter: React.FC<FooterProps> = ({ className = "" }) => {
  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Add subscription logic here
  };

  return (
    <footer className={`bg-gray-900 text-white py-12 ${className}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex items-center space-x-2">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-teal-500">
              <path
                fill="currentColor"
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              />
            </svg>
            <span className="text-white">Virtual Class for Zoom</span>
          </div>

          <div className="text-center">
            <h3 className="text-lg mb-4">Subscribe to get our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 rounded-md bg-gray-800 text-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-teal-500 rounded-md hover:bg-teal-600"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex space-x-6 text-sm text-gray-400">
            <Link to="/careers" className="hover:text-white">
              Careers
            </Link>
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>

          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} Class Technologies Inc.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LearnerFooter;
