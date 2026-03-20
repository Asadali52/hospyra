'use client'

import { useState, useRef, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import TrustedBrandImg_1 from "@/public/trusted-brand-image/trusted-brand-1.png";
import TrustedBrandImg_2 from "@/public/trusted-brand-image/trusted-brand-2.png";
import TrustedBrandImg_3 from "@/public/trusted-brand-image/trusted-brand-3.png";
import TrustedBrandImg_4 from "@/public/trusted-brand-image/trusted-brand-4.png";
import TrustedBrandImg_5 from "@/public/trusted-brand-image/trusted-brand-5.png";
import TrustedBrandImg_6 from "@/public/trusted-brand-image/trusted-brand-6.png";
import TrustedBrandImg_7 from "@/public/trusted-brand-image/trusted-brand-7.png";

import videoLogo from "@/public/video-logo.svg";
import Brand_1_Logo from "@/public/trusted-brand-image/trusted-brand-logo-1.svg";
import Brand_2_Logo from "@/public/trusted-brand-image/trusted-brand-logo-2.svg";
import Brand_3_Logo from "@/public/trusted-brand-image/trusted-brand-logo-3.svg";
import Brand_4_Logo from "@/public/trusted-brand-image/trusted-brand-logo-4.svg";
import Brand_5_Logo from "@/public/trusted-brand-image/trusted-brand-logo-5.svg";
import Brand_6_Logo from "@/public/trusted-brand-image/trusted-brand-logo-6.svg";
import Brand_7_Logo from "@/public/trusted-brand-image/trusted-brand-logo-7.svg";

type Slide = {
  type: "video" | "image"
  src: string | StaticImageData
  logo: StaticImageData
}

const slides: Slide[] = [
  { type: "video", src: "/video.mp4", logo: videoLogo },
  { type: "image", src: TrustedBrandImg_1, logo: Brand_1_Logo },
  { type: "image", src: TrustedBrandImg_2, logo: Brand_2_Logo },
  { type: "image", src: TrustedBrandImg_3, logo: Brand_3_Logo },
  { type: "image", src: TrustedBrandImg_4, logo: Brand_4_Logo },
  { type: "image", src: TrustedBrandImg_5, logo: Brand_5_Logo },
  { type: "image", src: TrustedBrandImg_6, logo: Brand_6_Logo },
  { type: "image", src: TrustedBrandImg_7, logo: Brand_7_Logo },
]

const TrustedByRestaurants = () => {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const totalSlides = slides.length

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return

      if (slides[index].type === "video") {
        if (index === carouselIndex) {
          video.currentTime = 0
          video.play()
        } else {
          video.pause()
        }
      }
    })
  }, [carouselIndex])

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="py-14 overflow-hidden">
      <h2 className="text-[46px] text-center max-[1200px]:text-[36px] max-[640px]:text-[28px] font-semibold">
        TRUSTED BY GROWING BRANDS
      </h2>

      <div className="relative mt-8">
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(50% - ${carouselIndex * 80}vw - 40vw))`,
            }}
          >
            {slides.map((item, index) => (
              <div
                key={index}
                className="relative w-[80vw] max-md:h-100 md:aspect-video shrink-0 rounded-xl overflow-hidden bg-black"
              >
                <div className="absolute top-4 left-4 z-10">
                  <Image
                    src={item.logo}
                    alt="brand logo"
                    className="w-42.5 md:w-55 lg:w-auto"
                  />
                </div>

                {item.type === "video" ? (
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el
                    }}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                  >
                    <source src={item.src as string} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={item.src as StaticImageData}
                    alt="brand"
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCarouselIndex(index)}
              className={`h-2 rounded-full transition-all ${index === carouselIndex
                  ? 'bg-[#FF6B35] w-6'
                  : 'bg-white w-2'
                }`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-[#27272A] hover:bg-[#3a3a3a] flex items-center justify-center transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  )
}

export default TrustedByRestaurants