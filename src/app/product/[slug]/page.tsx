import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import type { Metadata } from 'next';
import ProductClient from './ProductClient';

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

type PageProps = {
  params: {
    slug: string;
  };
};

// ✅ Metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
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

// ✅ Page
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const q = query(collection(db, 'products'), where('slug', '==', params.slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    notFound();
  }

  const product = querySnapshot.docs[0].data() as ProductData;

  return (
    <ProductClient product={product} slug={params.slug} />
  );
}