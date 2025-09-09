"use client";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const router = useRouter();

  const slides = [
    {
      img: "/featured3.jpg",
      title: "Shop the Latest Collections",
      subtitle: "Discover amazing products at unbeatable prices",
      btn: "Shop Now",
      gradient: "from-purple-600/60 to-pink-600/60",
    },
    {
      img: "/featured5.jpg",
      title: "Unlimited Services",
      subtitle: "Premium quality with exceptional customer care",
      btn: "Order Now",
      gradient: "from-blue-600/60 to-cyan-600/60",
    },
    {
      img: "/featured2.jpg",
      title: "Adventure Without Limits",
      subtitle: "Explore the world with our exclusive collection",
      btn: "Explore More",
      gradient: "from-green-600/60 to-emerald-600/60",
    },
  ];

  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="h-full w-full"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        loop={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        allowTouchMove={true}
        resistance={false}
        resistanceRatio={0}
        speed={800}
        effect="slide"
        grabCursor={true}
      >
        {slides.map((slide, i) => (
          <SwiperSlide
            key={i}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full h-[85vh]">
              <Image
                src={slide.img}
                alt={`hero-${i}`}
                fill
                className="object-cover"
                priority={i === 0}
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} z-10`}
              ></div>

              {/* Content Container */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-8 px-4 text-center">
                {/* Badge */}
                <div
                  className={`px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-all duration-700 ease-out delay-100
                  ${
                    activeIndex === i
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }
                `}
                >
                  <span className="text-white text-sm font-medium">
                    Featured Collection
                  </span>
                </div>

                {/* Main Title */}
                <h1
                  className={`text-[clamp(2.25rem,6vw,6rem)] font-bold text-white transition-all duration-700 ease-out
                    ${
                      activeIndex === i
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }
                    `}
                >
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p
                  className={`text-lg sm:text-xl lg:text-2xl text-white/90 max-w-2xl transition-all duration-700 ease-out delay-300
                    ${
                      activeIndex === i
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }
                  `}
                >
                  {slide.subtitle}
                </p>

                {/* CTA Button */}
                <button
                  onClick={() => router.push("/products")}
                  className={` rounded-2xl    px-8 py-4  bg-white text-gray-900 font-bold text-lg transition-all 
                    duration-300 ease-out delay-50 hover:bg-black hover:text-white  hover:scale-105 shadow-2xl
                    ${
                      activeIndex === i
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }
                  `}
                >
                  {slide.btn}
                </button>
              </div>

              {/* Decorative Elements */}
              <div
                className={`absolute top-20 left-20 w-20 h-20 border-2 border-white/20 rounded-full transition-all duration-1000 ease-out delay-200
                ${
                  activeIndex === i
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-50"
                }
              `}
              ></div>
              <div
                className={`absolute bottom-20 right-20 w-16 h-16 border-2 border-white/20 rounded-full transition-all duration-1000 ease-out delay-400
                ${
                  activeIndex === i
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-50"
                }
              `}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-4">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all duration-500 cursor-pointer backdrop-blur-sm
              ${
                activeIndex === i
                  ? "bg-white scale-125 shadow-lg shadow-white/50"
                  : "bg-white/40 hover:bg-white/60 hover:scale-110"
              }
            `}
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.slideTo(i);
              }
            }}
          ></div>
        ))}
      </div>

      {/* Enhanced Navigation Buttons */}
      <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          @apply w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 z-30;
          background: rgba(255, 255, 255, 0.8); /* دائرة غامقة */
          border: 1px solid rgba(255, 255, 255, 0.3);
          pointer-events: auto !important;
          cursor: pointer;
          border-radius: 6px !important;
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          @apply text-white font-bold;
          font-size: 18px;
          transition: all 0.3s ease;
          color: #1f1f1f;
        }

        /* Hover / Active تأثير */
        .swiper-button-prev:hover,
        .swiper-button-next:hover,
        .swiper-button-prev:active,
        .swiper-button-next:active {
          background: #000000;
          border-color: #111;
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
          border-color: transparent;
        }

        .swiper-button-prev:hover::after,
        .swiper-button-next:hover::after,
        .swiper-button-prev:active::after,
        .swiper-button-next:active::after {
          color: white !important;
        }

        .swiper-button-prev {
          left: 25px;
        }
        .swiper-button-next {
          right: 25px;
        }

        @media (max-width: 768px) {
          .swiper-button-prev,
          .swiper-button-next {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
