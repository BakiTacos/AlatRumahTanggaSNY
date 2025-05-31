import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs } 
from 'firebase/firestore';
import { Metadata } from 'next';
import Image from 'next/image';

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

type ProductPageProps = {
  params: { slug: string };
};

// 🧠 SEO: generateMetadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const q = query(collection(db, 'products'), where('slug', '==', params.slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  const product = querySnapshot.docs[0].data() as ProductData;

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


export default async function ProductPage(props: ProductPageProps) {
  const { slug } = await props.params;

  const q = query(collection(db, 'products'), where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    notFound();
  }

  const doc = querySnapshot.docs[0];
  const product = doc.data() as ProductData;

  return (
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-background rounded-xl shadow-lg overflow-hidden border border-foreground/10">
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
            <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
            <p className="text-foreground/80 text-lg mb-8 leading-relaxed">{product.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.shopeeLink && (
                <a
                  href={product.shopeeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-[#EE4D2D] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <span className="font-semibold">Buy on Shopee</span>
                </a>
              )}
              
              {product.tiktokshopLink && (
                <a
                  href={product.tiktokshopLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-[#000000] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <span className="font-semibold">Buy on TikTok Shop</span>
                </a>
              )}
              
              {product.lazadaLink && (
                <a
                  href={product.lazadaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-[#0F146D] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <span className="font-semibold">Buy on Lazada</span>
                </a>
              )}
              
              {product.blibliLink && (
                <a
                  href={product.blibliLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-[#0095DA] text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  <span className="font-semibold">Buy on Blibli</span>
                </a>
              )}
              
              {product.youtubeLink && (
                <a
                  href={product.youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-[#FF0000] text-white rounded-lg hover:opacity-90 transition-opacity col-span-full"
                >
                  <span className="font-semibold">Watch on YouTube</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}