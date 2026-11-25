export function Logo({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path
        d="M32 5.5c1 0 1.9.5 2.4 1.4L57.2 50.2c1 1.8-.3 4-2.4 4H9.2c-2.1 0-3.4-2.2-2.4-4L29.6 6.9c.5-.9 1.4-1.4 2.4-1.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path d="M22.2 44.2 32 24.8l9.8 19.4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M25.4 37.2h13.2" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
