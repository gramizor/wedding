export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px w-16 bg-taupe/50" />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5Z"
          fill="#C9B2A8"
          opacity="0.6"
        />
      </svg>
      <div className="h-px w-16 bg-taupe/50" />
    </div>
  );
}
