'use client';

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* Hero Carousel Section */}
      <section className="relative h-[600px] overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex-[0_0_100%] relative h-full">
              <div className="absolute inset-0 bg-[#333333]/60 z-10" />
              <Image 
                src={`/product-${index}.jpg`}
                alt={`Featured Product ${index}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
                <div className="text-center">
                  <h1 className="text-5xl font-bold mb-4">Quality Home Appliances</h1>
                  <p className="text-xl mb-8">Discover our premium selection</p>
                  <button className="bg-[#A5D6A7] text-[#333333] px-8 py-3 rounded-full font-semibold hover:bg-[#333333] hover:text-white transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 py-16 text-[#333333]">
        {/* About Us Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <p className="text-lg">SNY has been providing quality home appliances since 2010. We pride ourselves on offering durable, efficient, and stylish products that enhance your daily life.</p>
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
       </main>
    </div>
  );
}
