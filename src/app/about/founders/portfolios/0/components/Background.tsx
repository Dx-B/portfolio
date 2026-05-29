export default function Background() {
  return (
    <>
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[linear-gradient(rgba(229,231,235,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(229,231,235,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[clamp(30px,4vw,70px)_clamp(30px,4vw,70px)] dark:bg-size-[clamp(40px,6vw,100px)_clamp(40px,6vw,120px)]" />

      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="fixed -left-20 -top-3 h-80 w-80 bg-violet-600/35 blur-[120px]" />
        <div className="fixed -right-20 -bottom-12 h-80 w-80 bg-sky-500/25 blur-[120px]" />
      </div>
    </>
  );
}
