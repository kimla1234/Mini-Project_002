"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

export default function CarouselComponent() {
  return (
    <div className="max-w-full mx-auto pt-1  z-2">
      <div
        id="default-carousel"
        className="relative overflow-hidden shadow-lg "
        data-carousel="slide"
      >
        <div
          className="relative h-40 sm:h-64 xl:h-80 2xl:h-[600px]"
          data-carousel-inner
        >
          {/* Item 1 */}
          <div className="duration-700 ease-in-out" data-carousel-item>
            <Image
              src="/assets/2.jpg"
              className=" w-full h-full"
              alt="Slide 1"
              width={500}
              height={500}
            />
          </div>
          {/* Item 2 */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image
              src="/assets/3.jpg"
              className="object-cover w-full h-full"
              alt="Slide 2"
              width={500}
              height={500}
            />
          </div>
          {/* Item 3 */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image
              src="/assets/4.jpg"
              className="object-cover w-full h-full"
              alt="Slide 3"
              width={500}
              height={500}
            />
          </div>
          {/* Item 3 */}
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <Image
              src="/assets/1.jpg"
              className="object-cover w-full h-full"
              alt="Slide 4"
              width={500}
              height={500}
            />
          </div>
        </div>
        {/* Slider indicators */}
        <div
          className="flex absolute bottom-5 left-1/2 z-30 -translate-x-1/2 space-x-2"
          data-carousel-indicators
        >
          <button
            type="button"
            className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:bg-gray-400 transition"
          ></button>
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="flex absolute top-1/2 left-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
          data-carousel-prev
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          className="flex absolute top-1/2 right-3 z-40 items-center justify-center w-10 h-10 bg-gray-200/50 rounded-full hover:bg-gray-300 focus:outline-none transition"
          data-carousel-next
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>
      </div>
      <div className=" flex justify-center ">
        <p className="mt-5 text-center text-gray-700 w-[80%] dark:text-gray-300">
          Welcome to Online Shopping, where shopping meets convenience, quality,
          and affordability. We are your ultimate destination for all your
          online shopping needs, providing you with a seamless and enjoyable
          experience right from the comfort of your own home.
        </p>
      </div>
    </div>
  );
}
