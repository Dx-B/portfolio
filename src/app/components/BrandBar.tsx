"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const brands = [
  { src: "/brands/aws.svg", alt: "AWS", scale: "scale-110" },
  { src: "/brands/cplusplus.svg", alt: "C++", scale: "scale-125" },
  { src: "/brands/github.svg", alt: "GitHub", scale: "scale-[2.1]" },
  { src: "/brands/html.svg", alt: "HTML", scale: "scale-[1.35]" },
  { src: "/brands/java.svg", alt: "Java", scale: "scale-[2]" },
  { src: "/brands/javascript.svg", alt: "JavaScript", scale: "scale-[1.3]" },
  { src: "/brands/nextJS.svg", alt: "Next.js", scale: "scale-[2.5]" },
  { src: "/brands/nodeJS.svg", alt: "Node.js", scale: "scale-[2.3]" },
  { src: "/brands/python.svg", alt: "Python", scale: "" },
  { src: "/brands/typescript.svg", alt: "TypeScript", scale: "scale-[1.3]" },
  { src: "/brands/unrealengine.svg", alt: "Unreal Engine", scale: "scale-125" },
  { src: "/brands/wordpress.svg", alt: "WordPress", scale: "" },
];

function BrandGroup({
  groupRef,
}: {
  groupRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={groupRef}
      className="flex shrink-0 items-center gap-18 pr-18"
    >
      {brands.map((brand) => (
        <div
          key={brand.src}
          className="flex h-16 w-18 shrink-0 items-center justify-center"
        >
          <Image
            src={brand.src}
            alt={brand.alt}
            width={50}
            height={64}
            className={`
              max-h-full max-w-full object-contain
              ${brand.scale}
              opacity-70 grayscale transition
              hover:opacity-100 hover:grayscale-0
              dark:invert dark:opacity-80
            `}
          />
        </div>
      ))}
    </div>
  );
}

export default function BrandBar() {
  const groupRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const update = () => {
      if (groupRef.current) {
        setDistance(groupRef.current.offsetWidth);
      }
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="relative w-full overflow-hidden border-y border-black/10 py-6 dark:border-white/10">
      <div
        className="marquee-track flex w-max items-center"
        style={
          {
            "--marquee-distance": `-${distance}px`,
          } as React.CSSProperties
        }
      >
        <BrandGroup groupRef={groupRef} />
        <BrandGroup />
        <BrandGroup />
        <BrandGroup />
      </div>
    </section>
  );
}