export function CrystalMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 32"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <polygon points="10,0 0,12 10,32" opacity="0.45" />
      <polygon points="10,0 20,12 10,32" opacity="0.9" />
      <polygon points="10,0 6,12 10,32 14,12" opacity="0.68" />
    </svg>
  );
}
