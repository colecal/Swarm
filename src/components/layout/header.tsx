import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-800/60 bg-surface-0/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-medium text-neutral-400 font-display">
          Agent Command Center
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="accent" dot>
          System Online
        </Badge>
      </div>
    </header>
  );
}
