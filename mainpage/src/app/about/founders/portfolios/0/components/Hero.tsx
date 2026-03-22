import Carousel from "@/app/components/Carousel";

export default function Hero() {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex-3" />

      <h1 className="text-3xl font-semibold text-shadow-[0_0_12px_rgba(255,255,255,0.3)]">
        What's on your mind?
      </h1>

      <Carousel />

      <div className="flex-10" />

      <footer className="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
          <path fillRule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
        </svg>
      </footer>

      <div className="flex-2" />
    </div>
  );
}
