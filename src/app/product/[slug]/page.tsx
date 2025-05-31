// app/product/[slug]/page.tsx
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';

type ProductPageProps = {
  params: {
    slug: string;
  };
};

interface ProductData {
  name: string;
  description: string;
  imageLink?: string;
  shopeeLink?: string;
  tiktokshopLink?: string;
  lazadaLink?: string;
  blibliLink?: string;
  youtubeLink?: string;
}

// ✅ SEO metadata function (no error)
export async function generateMetadata(
  { params }: ProductPageProps
): Promise<Metadata> {
  const q = query(collection(db, 'products'), where('slug', '==', params.slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  const product = snapshot.docs[0].data() as ProductData;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.imageLink ? [product.imageLink] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.imageLink ? [product.imageLink] : [],
    },
  };
}

// ✅ Page Component (no error)
export default async function ProductPage({ params }: ProductPageProps) {
  const q = query(collection(db, 'products'), where('slug', '==', params.slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) notFound();

  const product = snapshot.docs[0].data() as ProductData;

  return (
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {product.imageLink && (
            <div className="relative h-[400px] w-full">
              <Image
                src={product.imageLink}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.shopeeLink && (
                <a
                  href={product.shopeeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#EE4D2D] text-white rounded-lg text-center font-semibold"
                >
                  Buy on Shopee
                </a>
              )}

              {product.tiktokshopLink && (
                <a
                  href={product.tiktokshopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-black text-white rounded-lg text-center font-semibold"
                >
                  Buy on TikTok Shop
                </a>
              )}

              {product.lazadaLink && (
                <a
                  href={product.lazadaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#0F146D] text-white rounded-lg text-center font-semibold"
                >
                  Buy on Lazada
                </a>
              )}

              {product.blibliLink && (
                <a
                  href={product.blibliLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#0095DA] text-white rounded-lg text-center font-semibold"
                >
                  Buy on Blibli
                </a>
              )}

              {product.youtubeLink && (
                <a
                  href={product.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md:col-span-2 px-6 py-3 bg-[#FF0000] text-white rounded-lg text-center font-semibold"
                >
                  Watch on YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}