import { GraduationCap, Briefcase, Trophy, Rocket } from 'lucide-react';

// Returns the correct icon component based on the timeline item type
export const getTimelineIcon = (type: string) => {
  switch (type) {
    case "education":
      return GraduationCap;
    case "work":
      return Briefcase;
    case "achievement":
      return Trophy;
    case "venture":
      return Rocket;
    default:
      return Briefcase;
  }
};

// Returns the Tailwind CSS classes for the icon's background and text color
export const getTimelineIconStyle = (type: string) => {
  switch (type) {
    case "education":
      return "text-blue-600 bg-blue-100";
    case "work":
      return "text-purple-600 bg-purple-100";
    case "achievement":
      return "text-yellow-600 bg-yellow-100";
    case "venture":
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};