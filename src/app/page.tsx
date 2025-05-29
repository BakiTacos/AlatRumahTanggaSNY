'use client';

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 10, // ✅ smoother scroll
    // You can add `duration` or `dragFree` if needed
  });
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  // ✅ Autoplay with scroll check
  useEffect(() => {
    if (!emblaApi) return;
  
    const autoplay = () => {
      if (!emblaApi.canScrollNext()) {
        emblaApi.scrollTo(0); // reset to start if needed (optional)
      } else {
        emblaApi.scrollNext();
      }
    };
  
    const timer = setInterval(autoplay, 5000);
  
    return () => clearInterval(timer);
  }, [emblaApi]);

  const categories = [
    {
      title: 'Kitchen Appliances',
      description: 'Modern solutions for your cooking needs',
      image: 'https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%201.png',
      alt: 'Kitchen Appliances',
    },
    {
      title: 'Living Room',
      description: 'Comfort and style for your living space',
      image: 'https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%201.png',
      alt: 'Living Room Appliances',
    },
    {
      title: 'Bedroom',
      description: 'Essential appliances for peaceful rest',
      image: 'https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%201.png',
      alt: 'Bedroom Appliances',
    },
    {
      title: 'Bathroom',
      description: 'Modern bathroom solutions',
      image: 'https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%201.png',
      alt: 'Bathroom Appliances',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-16">
      {/* Hero Carousel Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
          {[
            "https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%201.png",
            "https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%202.png",
            "https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%203.png",
            "https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%204.png"
          ].map((imageUrl, index) => (
            <div key={index} className="flex-[0_0_100%] relative h-[600px]">
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
              <p className="text-lg">SNY has been providing quality home appliances since 2010. We pride ourselves on offering durable, efficient, and stylish products that enhance your daily life.</p>
              <p className="text-lg">Our commitment to excellence and customer satisfaction has made us a trusted name in the industry.</p>
            </div>
            <div className=" relative h-[400px] w-full">
              <Image
                src="https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%201.png"
                alt="About SNY Home Appliances"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* Product Categories Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Product Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>



      </main>
    </div>
  );
}
