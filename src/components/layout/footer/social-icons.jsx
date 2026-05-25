const baseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function TelegramIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22 11 13 2 9 22 2Z" />
    </svg>
  );
}

export function WhatsAppIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
      <path d="M9 9.5c.3 1.5 1.7 2.9 3.2 3.2" />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M9 12.5a3.5 3.5 0 1 0 3.5 3.5V3a5 5 0 0 0 5 5" />
    </svg>
  );
}
