export function GradientTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-shadow-[0_0_12px_rgba(255,255,255,0.3)] text-3xl md:text-4xl font-bold bg-white bg-clip-text text-transparent text-center">
      {children}
    </h2>
  );
}
