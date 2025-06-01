'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, getDocs, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  content: string;
  createdAt: string;
}

export default function ArticlePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchArticles = async (isInitial = false) => {
    try {
      let q;
      if (isInitial) {
        q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'), limit(20));
      } else {
        if (!lastVisible) return;
        q = query(
          collection(db, 'articles'),
          orderBy('createdAt', 'desc'),
          startAfter(lastVisible),
          limit(20)
        );
      }

      const querySnapshot = await getDocs(q);
      const articleList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Article[];

      if (isInitial) {
        setArticles(articleList);
      } else {
        setArticles(prev => [...prev, ...articleList]);
      }

      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === 20);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(true);
  }, []);

  const loadMore = () => {
    if (!hasMore || loading) return;
    fetchArticles();
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
        <h1 className="text-4xl font-bold text-foreground mb-8">Articles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
           article.slug ? (
           <Link href={`/article/${article.slug}`} key={article.id}>
              <div className="bg-background rounded-xl shadow-lg overflow-hidden border border-foreground/10 transition-transform duration-300 hover:scale-105">
                {article.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-2 hover:text-primary">
                    {article.title}
                  </h2>
                  <p className="text-foreground/70 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="mt-4 text-sm text-foreground/60">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Link>
          ) : null))}
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