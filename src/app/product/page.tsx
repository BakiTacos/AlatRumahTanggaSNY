'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  imageLink: string;
  youtubeLink: string;
  tiktokshopLink: string;
  shopeeLink: string;
  lazadaLink: string;
  blibliLink: string;
  createdAt: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (isInitial = false) => {
    try {
      let q;
      if (isInitial) {
        q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(20));
      } else {
        if (!lastVisible) return;
        q = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(20)
        );
      }

      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
      })) as Product[];

      if (isInitial) {
        setProducts(productList);
      } else {
        setProducts(prev => [...prev, ...productList]);
      }

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === 20);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(true);
  }, []);

  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A5D6A7]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={product.imageLink}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="space-y-2">
                  {product.youtubeLink && (
                    <a
                      href={product.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-red-600 hover:text-red-700"
                    >
                      Watch on YouTube
                    </a>
                  )}
                  {product.tiktokshopLink && (
                    <a
                      href={product.tiktokshopLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-black hover:text-gray-700"
                    >
                      Buy on TikTok Shop
                    </a>
                  )}
                  {product.shopeeLink && (
                    <a
                      href={product.shopeeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-orange-500 hover:text-orange-600"
                    >
                      Buy on Shopee
                    </a>
                  )}
                  {product.lazadaLink && (
                    <a
                      href={product.lazadaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-700"
                    >
                      Buy on Lazada
                    </a>
                  )}
                  {product.blibliLink && (
                    <a
                      href={product.blibliLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-500 hover:text-blue-600"
                    >
                      Buy on Blibli
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-[#A5D6A7] text-white rounded-md hover:bg-[#81C784] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A5D6A7]"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}