'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  imageLink: string;
  slug: string;
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
        id: doc.id,
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
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Link href={`/product/${product.slug}`} key={product.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src={product.imageLink}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h2>
                </div>
              </div>
            </Link>
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