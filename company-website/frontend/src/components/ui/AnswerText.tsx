import Link from "next/link";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Plain text for structured data: "[text](/path)" becomes "text". */
export const plainText = (text: string) => text.replace(LINK, "$1");

/** Renders "[text](/path)" inside an FAQ answer as a site link. */
export default function AnswerText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return link ? (
          <Link key={i} href={link[2]} className="text-gold-dark font-semibold underline underline-offset-4">{link[1]}</Link>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}
