export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/10 dark:bg-black/20 outline outline-white/10 rounded-xl ${className}`}>
      {children}
    </div>
  );
}
