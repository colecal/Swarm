import { Sidebar } from "./sidebar";
import { Header } from "./header";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface-0">
      <Sidebar />
      <div className="flex-1 pl-56">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
