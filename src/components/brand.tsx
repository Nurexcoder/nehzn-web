import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The Nehzn lockup: the mark (a teal dot resting above a navy arc — it reads
 * as a smile) beside the wordmark.
 *
 * The SVGs are authored in the brand's own navy and teal. On dark grounds the
 * wordmark flips to ivory via a CSS filter rather than a second asset.
 */
export function Logo({
  className,
  onDark = false,
  href = "/",
}: {
  className?: string;
  onDark?: boolean;
  href?: string | null;
}) {
  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/mark.svg"
        alt=""
        width={30}
        height={21}
        priority
        className={cn("h-[18px] w-auto", onDark && "brightness-0 invert")}
      />
      <Image
        src="/brand/wordmark.svg"
        alt="Nehzn"
        width={92}
        height={12}
        priority
        className={cn(
          "h-[13px] w-auto",
          onDark ? "brightness-0 invert" : "[filter:invert(28%)_sepia(93%)_saturate(560%)_hue-rotate(135deg)_brightness(93%)_contrast(101%)]",
        )}
      />
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="Nehzn — home" className="inline-flex">
      {content}
    </Link>
  );
}

/** The mark alone, for tight square slots. */
export function Mark({ className, size = 28 }: { className?: string; size?: number }) {
  return (
    <Image
      src="/brand/mark.svg"
      alt=""
      width={size}
      height={Math.round((size * 110.6) / 160)}
      className={className}
    />
  );
}
