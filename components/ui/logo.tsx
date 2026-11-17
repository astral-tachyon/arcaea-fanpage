import Image from "next/image";

/** The Arcaea wordmark. Set the height with a class; the width follows. */
export function Logo({ className = "h-12", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/art/logo.webp"
      alt="Arcaea"
      width={690}
      height={232}
      priority={priority}
      sizes="200px"
      className={`logo w-auto ${className}`}
    />
  );
}
