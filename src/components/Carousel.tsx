"use client";
import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";

export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [AutoPlay()]);

  return (
    <div className="embla z-0" ref={emblaRef}>
      <div className="embla__container">
        <Image
          className="embla__slide"
          src={require("../../public/assets/banner-1.jpg")}
          alt="banner-1"
        />
        <Image
          className="embla__slide"
          src={require("../../public/assets/banner-2.jpg")}
          alt="banner-2"
        />
        <Image
          className="embla__slide"
          src={require("../../public/assets/banner-3.jpg")}
          alt="banner-3"
        />
      </div>
    </div>
  );
}
