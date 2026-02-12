interface NewsGenLogoProps {
  className?: string;
}

export function NewsGenLogo({ className = "w-12 h-12" }: NewsGenLogoProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="newsgen-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#14b8a6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        rx="22"
        fill="url(#newsgen-gradient)"
      />

      <g transform="translate(20, 20)">
        <rect
          x="2"
          y="8"
          width="12"
          height="44"
          rx="2"
          fill="white"
          opacity="0.9"
        />

        <rect
          x="18"
          y="2"
          width="42"
          height="56"
          rx="3"
          fill="white"
          stroke="white"
          strokeWidth="2"
        />

        <rect x="24" y="12" width="30" height="4" rx="2" fill="#14b8a6" />
        <rect x="24" y="22" width="24" height="3" rx="1.5" fill="#06b6d4" opacity="0.7" />
        <rect x="24" y="30" width="28" height="3" rx="1.5" fill="#06b6d4" opacity="0.7" />
        <rect x="24" y="38" width="22" height="3" rx="1.5" fill="#06b6d4" opacity="0.7" />
        <rect x="24" y="46" width="26" height="3" rx="1.5" fill="#06b6d4" opacity="0.7" />
      </g>
    </svg>
  );
}
