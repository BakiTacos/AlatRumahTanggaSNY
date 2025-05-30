'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
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

export default function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', params.id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          setProduct({
            id: productSnap.id,
            ...productSnap.data(),
          } as Product);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A5D6A7]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96 md:h-[500px]">
          <Image
            src={product.imageLink}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-8">{product.description}</p>

          <div className="space-y-4">
            {product.youtubeLink && (
              <a
                href={product.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Watch on YouTube
              </a>
            )}
            {product.tiktokshopLink && (
              <a
                href={product.tiktokshopLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-3 text-white bg-black rounded-lg hover:bg-gray-900 transition-colors duration-200"
              >
                Buy on TikTok Shop
              </a>
            )}
            {product.shopeeLink && (
              <a
                href={product.shopeeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-3 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Buy on Shopee
              </a>
            )}
            {product.lazadaLink && (
              <a
                href={product.lazadaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Buy on Lazada
              </a>
            )}
            {product.blibliLink && (
              <a
                href={product.blibliLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Buy on Blibli
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}