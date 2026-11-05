import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Types and deletes a rotating list of phrases with a blinking caret. */
export function Typewriter({ phrases, className, typeMs = 38, holdMs = 2200 }: { phrases: string[]; className?: string; typeMs?: number; holdMs?: number }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = phrases[index % phrases.length];
    let t: number;
    if (!deleting && text === full) t = window.setTimeout(() => setDeleting(true), holdMs);
    else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
      return;
    } else
      t = window.setTimeout(
        () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
        deleting ? typeMs / 3 : typeMs,
      );
    return () => window.clearTimeout(t);
  }, [text, deleting, index, phrases, typeMs, holdMs]);

  return (
    <span className={cn("whitespace-pre-wrap", className)}>
      {text}
      <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-blink bg-cyan" />
    </span>
  );
}
