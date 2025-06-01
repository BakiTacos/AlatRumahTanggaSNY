import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';

interface Article {
  title: string;
  description: string;
  imageUrl: string;
  content: string;
  createdAt: string;
  slug: string;
  author?: string;
  category?: string;
  tags?: string[];
  readingTime?: number;
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
    title: `${data.title} | Alat Rumah Tangga SNY`,
    description: data.description,
    keywords: data.tags?.join(', '),
    authors: data.author ? [{ name: data.author }] : undefined,
    openGraph: {
      title: data.title,
      description: data.description,
      images: data.imageUrl ? [data.imageUrl] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.title,
      description: data.description,
      images: data.imageUrl ? [data.imageUrl] : [],
    },
    alternates: {
      canonical: `https://alatrumahtanggasny.com/article/${slug}`,
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

  const publishDate = new Date(data.createdAt);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.imageUrl,
    datePublished: publishDate.toISOString(),
    author: data.author ? {
      '@type': 'Person',
      name: data.author,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Alat Rumah Tangga SNY',
      logo: {
        '@type': 'ImageObject',
        url: 'https://alatrumahtanggasny.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://alatrumahtanggasny.com/article/${slug}`
    }
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <article className="max-w-4xl mx-auto" itemScope itemType="https://schema.org/Article">
          <header className="text-center mb-12">
            <h1 itemProp="headline" className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-4 leading-tight">
              {data.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
              <time itemProp="datePublished" dateTime={publishDate.toISOString()}>
                {publishDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              {data.author && (
                <span itemProp="author" className="flex items-center">
                  <span className="hidden sm:inline mx-2">•</span>
                  By {data.author}
                </span>
              )}
              {data.readingTime && (
                <span className="flex items-center">
                  <span className="hidden sm:inline mx-2">•</span>
                  {data.readingTime} min read
                </span>
              )}
            </div>
            {data.tags && data.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {data.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/article/tag/${tag}`}
                    className="px-3 py-1 bg-gray-100 text-sm text-gray-700 rounded-full hover:bg-gray-200 transition"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {data.imageUrl && (
            <figure className="mb-12">
              <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={data.imageUrl}
                  alt={data.title}
                  fill
                  className="object-cover"
                  priority
                  itemProp="image"
                />
              </div>
              <figcaption className="mt-2 text-center text-sm text-gray-500">
                {data.title}
              </figcaption>
            </figure>
          )}
          
          <div itemProp="articleBody" className="prose prose-lg md:prose-xl lg:prose-2xl prose-slate mx-auto prose-headings:scroll-mt-24 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
            {data.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed text-gray-700 text-lg md:text-xl">
                {paragraph}
              </p>
            ))}
          </div>

          {data.category && (
            <div className="mt-12 text-center">
              <h2 className="text-lg font-semibold text-gray-900">Category</h2>
              <Link
                href={`/article/category/${data.category}`}
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                {data.category}
              </Link>
            </div>
          )}
        </article>
      </div>
    </>
  );
}