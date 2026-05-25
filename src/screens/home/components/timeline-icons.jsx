const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function CameraIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7l1.5-3h5L16 7" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function BulbIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 1 4 10.5V16H8v-2.5A6 6 0 0 1 12 3z" />
    </svg>
  );
}

export function FilmIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="7" y1="4" x2="7" y2="20" />
      <line x1="17" y1="4" x2="17" y2="20" />
    </svg>
  );
}

export function AtomIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  );
}

export function HelmetIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 14a9 9 0 0 1 18 0v2H3z" />
      <path d="M3 16h18v2H3z" />
    </svg>
  );
}

export function StarIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <polygon points="12,3 14.5,9.5 21.5,9.5 16,14 18,21 12,17 6,21 8,14 2.5,9.5 9.5,9.5" />
    </svg>
  );
}

export function BookIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 4h7a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H4V4z" />
      <path d="M20 4h-7a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h8V4z" />
    </svg>
  );
}

export function PeaceIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="12" y1="12" x2="5.5" y2="18.5" />
      <line x1="12" y1="12" x2="18.5" y2="18.5" />
    </svg>
  );
}
