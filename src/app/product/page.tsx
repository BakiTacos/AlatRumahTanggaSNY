'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';

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
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-foreground">Our Products</h1>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <Link href={`/product/${product.slug}`} key={product.id}>
              <div className="bg-background rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 border border-foreground/10">
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
                  <h2 className="text-lg font-semibold text-foreground truncate">{product.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-foreground text-background rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground transition-colors duration-200"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}