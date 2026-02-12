interface WebsiteProspectorLogoProps {
  className?: string;
}

export function WebsiteProspectorLogo({ className = "w-12 h-12" }: WebsiteProspectorLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100" height="100" rx="20" fill="url(#prospector-gradient)" />

      <rect x="20" y="25" width="60" height="45" rx="4" fill="white" />

      <rect x="20" y="25" width="60" height="10" rx="4" fill="#047857" />
      <circle cx="26" cy="30" r="2" fill="white" />
      <circle cx="33" cy="30" r="2" fill="white" />
      <circle cx="40" cy="30" r="2" fill="white" />

      <circle cx="50" cy="52.5" r="12" fill="#10b981" />
      <circle cx="50" cy="52.5" r="8" fill="none" stroke="white" strokeWidth="2.5" />

      <circle cx="53" cy="49.5" r="2.5" fill="white" />
      <rect x="49" y="54" width="2" height="6" fill="white" />
      <rect x="46" y="58" width="8" height="2" fill="white" />

      <defs>
        <linearGradient id="prospector-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
    </svg>
  );
}
