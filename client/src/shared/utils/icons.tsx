import {
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  HelpCircle,
  Video,
  FileText,
  MessageSquare,
  Lock,
} from "lucide-react";
import { CourseStatus } from "../types/CourseStatus";

export const getCourseStatusIcon = (status: CourseStatus) => {
  switch (status) {
    case "draft":
      return <AlertCircle className="w-5 h-5 mr-2 text-gray-500" />;
    case "completed":
      return <CheckCircle className="w-5 h-5 mr-2 text-blue-500" />;
    case "approved":
      return <CheckCircle className="w-5 h-5 mr-2 text-green-500" />;
    case "rejected":
      return <XCircle className="w-5 h-5 mr-2 text-red-500" />;
    case "requested":
      return <Clock className="w-5 h-5 mr-2 text-yellow-500" />;
    default:
      return <HelpCircle className="w-5 h-5 mr-2 text-gray-400" />;
  }
};

export const getMaterialsIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Video className="w-4 h-4" />;
    case "reading":
      return <FileText className="w-4 h-4" />;
    case "discussion":
      return <MessageSquare className="w-4 h-4" />;
    default:
      return <Lock className="w-4 h-4" />;
  }
};
