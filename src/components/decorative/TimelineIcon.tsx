const icons = {
  rings: (
    <>
      <circle cx="9" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="15" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
  camera: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 7 L9 4 H15 L16 7" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </>
  ),
  champagne: (
    <>
      <path d="M8 3 L7 10 H11 L10 3Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="9" y1="10" x2="9" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="16" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 3 L13 10 H17 L16 3Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="15" y1="10" x2="15" y2="16" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  party: (
    <>
      <path d="M4 4 L12 20 L20 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="7" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="3" r="1" fill="currentColor" />
      <circle cx="18" cy="3" r="1" fill="currentColor" />
      <circle cx="12" cy="2" r="1" fill="currentColor" />
    </>
  ),
};

export function TimelineIcon({
  icon,
  className = "",
}: {
  icon: keyof typeof icons;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {icons[icon]}
    </svg>
  );
}
