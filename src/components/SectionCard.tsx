import type { PropsWithChildren } from "react";
import { clsx } from "clsx";

type SectionCardProps = PropsWithChildren<{
  className?: string;
  title: string;
  description: string;
}>;

export function SectionCard({
  title,
  description,
  className,
  children,
}: SectionCardProps) {
  return (
    <section
      className={clsx(
        "rounded-[28px] border border-white/10 bg-slate-950/45 p-6 shadow-xl backdrop-blur",
        className,
      )}
    >
      <header className="mb-5">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm text-slate-300">{description}</p>
      </header>
      {children}
    </section>
  );
}
