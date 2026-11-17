/** The sky-note diamond: the site's recurring marker. Purely decorative. */
export function Diamond({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-block shrink-0 rotate-45 bg-current ${className}`} />;
}
