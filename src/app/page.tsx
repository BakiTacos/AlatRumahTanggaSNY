'use client';

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const timer = setInterval(autoplay, 5000);
    return () => clearInterval(timer);
  }, [autoplay]);


  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-16">
      {/* Hero Carousel Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="flex h-full transition-transform duration-300">
          {[
            "https://github.com/BakiTacos/image-host/blob/main/AlatRumahTanggaSNY/Carousel/Banner%201.png?raw=true",
            "https://github.com/BakiTacos/image-host/blob/main/AlatRumahTanggaSNY/Carousel/Banner%202.png?raw=true",
            "https://github.com/BakiTacos/image-host/blob/main/AlatRumahTanggaSNY/Carousel/Banner%204.png?raw=true",
            "https://github.com/BakiTacos/image-host/blob/main/AlatRumahTanggaSNY/Carousel/Banner%203.png?raw=true"
          ].map((imageUrl, index) => (
            <div key={index} className="flex-[0_0_100%] relative h-full">
              <Image 
                src={imageUrl}
                alt={`Featured Product ${index + 1}`}
                fill
                className="object-cover"
                priority
              />
            </div>
          ))}
          </div>
        </div>
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
          onClick={scrollPrev}
        >
          <svg className="h-6 w-6 text-[#333333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
          onClick={scrollNext}
        >
          <svg className="h-6 w-6 text-[#333333]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
  
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16 text-[#333333]">
        {/* About Us Section */}
        <section id="about-us" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <p className="text-lg">SNY has been providing quality home appliances since 2019. We pride ourselves on offering durable, efficient, and stylish products that enhance your daily life.</p>
              <p className="text-lg">Our commitment to excellence and customer satisfaction has made us a trusted name in the industry.</p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/about-us.jpg"
                alt="About SNY Home Appliances"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Product Categories Section */}
        <section id="catalogue" className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Kitchen Appliances */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src="https://github.com/BakiTacos/image-host/blob/main/AlatRumahTanggaSNY/Categories/Kitchen.png?raw=true"
                  alt="Kitchen Appliances"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold mb-2">Kitchen Appliances</h3>
                <p className="text-sm opacity-90">Modern solutions for your cooking needs</p>
              </div>
            </div>

            {/* Living Room */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src="https://github.com/BakiTacos/image-host/blob/main/AlatRumahTanggaSNY/Categories/Living%20Room.png?raw=true"
                  alt="Living Room Appliances"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold mb-2">Living Room</h3>
                <p className="text-sm opacity-90">Comfort and style for your living space</p>
              </div>
            </div>

            {/* Bedroom */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src="https://github.com/BakiTacos/image-host/blob/main/AlatRumahTanggaSNY/Categories/Bedroom.png?raw=true"
                  alt="Bedroom Appliances"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold mb-2">Bedroom</h3>
                <p className="text-sm opacity-90">Essential appliances for peaceful rest</p>
              </div>
            </div>

            {/* Bathroom */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 w-full">
                <Image
                  src="https://github.com/BakiTacos/image-host/blob/main/AlatRumahTanggaSNY/Categories/Bathroom.png?raw=true"
                  alt="Bathroom Appliances"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold mb-2">Bathroom</h3>
                <p className="text-sm opacity-90">Modern bathroom solutions</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
