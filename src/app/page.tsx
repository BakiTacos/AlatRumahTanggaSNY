'use client';

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
  createdAt: string;
}

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 10,
  });

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchRandomArticles() {
      const articlesRef = collection(db, 'articles');
      const q = query(articlesRef, limit(3));
      const snapshot = await getDocs(q);
      const fetchedArticles = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Article[];
      
      // Shuffle the articles
      const shuffledArticles = [...fetchedArticles].sort(() => Math.random() - 0.5);
      setArticles(shuffledArticles);
    }

    fetchRandomArticles();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  useEffect(() => {
    if (!emblaApi) return;
  
    const autoplay = () => {
      if (!emblaApi.canScrollNext()) {
        emblaApi.scrollTo(0);
      } else {
        emblaApi.scrollNext();
      }
    };
  
    const timer = setInterval(autoplay, 5000);
  
    return () => clearInterval(timer);
  }, [emblaApi]);

  const categories = [
    {
      title: 'Dapur',
      description: 'Perlengkapan dan Peralatan Dapur',
      image: 'https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Categories/Dapur.jpeg',
      alt: 'Dapur',
    },
    {
      title: 'Ruang Tamu',
      description: 'Perlengkapan dan Peralatan Ruang Tamu',
      image: 'https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Categories/Living%20Room.jpeg',
      alt: 'Ruang Tamu',
    },
    {
      title: 'Kamar Tidur',
      description: 'Perlengkapan dan Peralatan Kamar Tidur',
      image: 'https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Categories/Bedroom.png',
      alt: 'Kamar Tidur',
    },
    {
      title: 'Kamar Mandi',
      description: 'Perlengkapan dan Peralatan Kamar Mandi',
      image: 'https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Categories/Bathroom.jpeg',
      alt: 'Kamar Mandi',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-16">
      {/* Hero Carousel Section */}
      <section id="home" className="relative h-[300px] md:h-[600px] overflow-hidden">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
          {[
            "https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%201.png",
            "https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%202.png",
            "https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%203.png",
            "https://raw.githubusercontent.com/BakiTacos/image-host/refs/heads/main/AlatRumahTanggaSNY/Carousel/Banner%204.png"
          ].map((imageUrl, index) => (
            <div key={index} className="flex-[0_0_100%] relative h-[300px] md:h-[600px]">
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

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <Link href="/article" className="text-blue-600 hover:text-blue-800 font-medium">
              View All Articles
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/article/${article.slug}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  {article.imageUrl && (
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{article.title}</h3>
                    <p className="text-gray-600 line-clamp-2">{article.description}</p>
                    <div className="mt-4 text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
