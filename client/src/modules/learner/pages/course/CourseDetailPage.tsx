import { Clock, Award, Monitor, Share2 } from "lucide-react";

export interface Course {
  id: string;
  status: CourseStatus;
  title: string;
  category: string;
  thumbnail: string;
  lessons: { id: string; title: string }[];
  description: string;
  duration: number;
}

export type CourseStatus =
  | "approved"
  | "rejected"
  | "completed"
  | "requested"
  | "published"
  | "draft";

const CourseDetails = () => {
  // Sample course data
  const course: Course = {
    id: "1",
    status: "published",
    title: "Version Control System",
    category: "Development",
    thumbnail: "/api/placeholder/800/400",
    lessons: [
      { id: "1", title: "Introduction to Version Control Systems" },
      { id: "2", title: "Types of VCS" },
      { id: "3", title: "Distributed Version Control Systems (DVCS)" },
    ],
    description:
      "Learn comprehensive version control systems and their implementation",
    duration: 32,
  };

  const originalPrice = 99.99;
  const discountedPrice = 49.65;
  const discount = 50;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="relative">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full rounded-lg object-cover h-64"
            />
            <span className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
              {course.status}
            </span>
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-2 text-gray-600">{course.description}</p>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Main Topics</h2>
              <div className="space-y-4">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center p-4 bg-blue-50 rounded-lg"
                  >
                    <span className="mr-4 text-blue-600 font-semibold">
                      {index + 1}.
                    </span>
                    <span className="text-gray-800">{lesson.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-3xl font-bold text-blue-600">
                  ${discountedPrice}
                </span>
                <span className="ml-2 text-gray-400 line-through">
                  ${originalPrice}
                </span>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded">
                {discount}% off
              </span>
            </div>

            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-6">
              Buy Now
            </button>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{course.duration} Modules</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Monitor className="w-5 h-5 mr-2" />
                <span>Access on all devices</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Award className="w-5 h-5 mr-2" />
                <span>Certificate of completion</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Share this course</h3>
              <div className="flex space-x-2">
                <button className="p-2 bg-white border rounded-lg hover:bg-gray-100">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
