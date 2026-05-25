// SVG-иконка по типу архивного элемента.
// Размер задаётся через CSS (width/height родителя или className),
// цвет — через currentColor.

const COMMON = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

export function ArchiveTypeIcon({ type, className = "", ...rest }) {
  const props = { ...COMMON, className, ...rest };

  switch (type) {
    case "manuscript":
      return (
        <svg {...props}>
          <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4z" />
          <path d="M8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case "photo":
      return (
        <svg {...props}>
          <rect x="3" y="6" width="18" height="14" rx="2" />
          <circle cx="12" cy="13" r="3.5" />
          <path d="M8 6l1.4-2h5.2L16 6" />
        </svg>
      );
    case "letter":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "audio":
      return (
        <svg {...props}>
          <path d="M3 12h3l3-7 6 14 3-7h3" />
        </svg>
      );
    case "video":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M10 9.2v5.6l5-2.8z" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}
