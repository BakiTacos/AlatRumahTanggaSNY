import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';

interface Article {
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  createdAt: string;
  slug: string;
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const { slug } = await params;
  const articlesRef = collection(db, 'articles');
  const q = query(articlesRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return {
      title: 'Article Not Found',
      description: 'The article you are looking for does not exist.',
    };
  }

  const data = querySnapshot.docs[0].data() as Article;

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: data.imageUrl ? [data.imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: data.imageUrl ? [data.imageUrl] : [],
    },
  };
}

export default async function ArticlePage(
  { params }: { params: Params }
) {
  const { slug } = await params;
  const articlesRef = collection(db, 'articles');
  const q = query(articlesRef, where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    notFound();
  }

  const data = querySnapshot.docs[0].data() as Article;

  return (
    <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-4 leading-tight">
            {data.title}
          </h1>
          <div className="text-sm text-gray-500">
            {new Date(data.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </header>

        {data.imageUrl && (
          <div className="mb-12">
            <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden shadow-lg">
              <Image
                src={data.imageUrl}
                alt={data.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}
        
        <div className="prose prose-lg md:prose-xl lg:prose-2xl prose-slate mx-auto">
          {data.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed text-gray-700 text-lg md:text-xl">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}