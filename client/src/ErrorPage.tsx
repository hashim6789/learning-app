import React from "react";
import { AlertTriangle, Server, Home, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

interface ErrorPageProps {
  title: string;
  message: string;
  icon: React.ElementType;
  actionText?: string;
  actionLink?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title,
  message,
  icon: Icon,
  actionText = "Go Home",
  actionLink = "/",
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="bg-white shadow-2xl rounded-xl p-8 border border-gray-200">
          <div className="flex justify-center mb-6">
            <Icon className="text-red-500" size={80} strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          <div className="flex justify-center space-x-4">
            <Link
              to={actionLink}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              <Home size={20} />
              <span>{actionText}</span>
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            >
              <RefreshCw size={20} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
        <div className="text-gray-500 text-sm">
          Need help? Contact our support team.
        </div>
      </div>
    </div>
  );
};

// 404 Not Found Page
export const NotFoundPage: React.FC = () => (
  <ErrorPage
    title="404 - Page Not Found"
    message="The page you're looking for doesn't exist or has been moved."
    icon={AlertTriangle}
  />
);

// 500 Internal Server Error Page
export const ServerErrorPage: React.FC = () => (
  <ErrorPage
    title="500 - Server Error"
    message="Something went wrong on our end. We're working to fix it."
    icon={Server}
    actionText="Return to Safety"
  />
);

export default ErrorPage;
