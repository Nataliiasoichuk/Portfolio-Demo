import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

export type ProjectCardProps = {
  /** Two-digit number shown before the title, for example "01". */
  index: string;
  /** Project name. */
  title: string;
  /** Short description of the kind of project, for example "Web platform · Study project". */
  kind: string;
  /** Address of the case page. Without it, or with `disabled`, the card is not clickable. */
  href?: string;
  /** Cover picture. Without it a placeholder is shown. Import the file from `src/assets`. */
  cover?: StaticImageData;
  /** Alternative text of the cover. Leave empty if the title already says it. */
  coverAlt?: string;
  /** Case page is not ready yet: shows "Case coming soon" and no link. */
  disabled?: boolean;
  className?: string;
};

const focus = "outline-offset-4 focus-visible:outline-2 focus-visible:outline-accent";

/**
 * Card of one portfolio project: cover, number, title, kind and a link to the case.
 */
export function ProjectCard({
  index,
  title,
  kind,
  href,
  cover,
  coverAlt = "",
  disabled = false,
  className = "",
}: ProjectCardProps) {
  const isLink = Boolean(href) && !disabled;
  const body = (
    <>
      <div className="relative flex aspect-cover w-full items-center justify-center overflow-hidden rounded-panel bg-surface">
        {cover ? (
          <Image src={cover} alt={coverAlt} fill sizes="(min-width: 1024px) 400px, 100vw" className="object-cover" />
        ) : (
          <span className="font-body text-caption uppercase tracking-wider text-ink">Project cover · mockup</span>
        )}
      </div>
      <div className="flex gap-4">
        <span className="font-display text-card-title text-accent">{index}</span>
        <div className="flex flex-1 flex-col gap-2">
          <span className={`font-display text-card-title text-ink ${isLink ? "group-hover:underline" : ""}`}>{title}</span>
          <span className="font-body text-body text-ink-muted">{kind}</span>
          <span className={`font-body text-body font-semibold ${isLink ? "text-accent" : "text-ink-muted"}`}>
            {isLink ? "View case →" : "Case coming soon"}
          </span>
        </div>
      </div>
    </>
  );
  const layout = `group flex flex-col gap-6 ${className}`;

  return isLink ? (
    <Link href={href as string} className={`${layout} ${focus}`}>
      {body}
    </Link>
  ) : (
    <div aria-disabled="true" className={layout}>
      {body}
    </div>
  );
}
