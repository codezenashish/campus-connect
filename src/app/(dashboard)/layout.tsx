export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-foreground bg-background font-sans flex flex-col h-screen max-w-7xl mx-auto w-full relative overflow-hidden">
      <main className="min-w-0 overflow-y-auto [&::-webkit-scrollbar]:hidden w-full pb-24 lg:pb-8 px-4 md:px-6">
        {children}
      </main>
    </div>
  );
}
