import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import Image from 'next/image';

// Define an interface for your product data
interface ProductData {
  name: string;
  description: string;
  imageLink?: string; // Optional if not all products have it
  shopeeLink?: string;
  tiktokshopLink?: string;
  lazadaLink?: string;
  blibliLink?: string;
  youtubeLink?: string;
  // Add other properties as they exist in your Firestore documents
}

// **THIS IS THE CRUCIAL CHANGE**
// params is now a Promise in Next.js 15+
type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
  // searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // Also applies to searchParams if you use them
};

export default async function ProductPage(props: ProductPageProps) {
  // **AWAIT PARAMS HERE**
  const { slug } = await props.params;

  const q = query(collection(db, 'products'), where('slug', '==', slug)); // Use the awaited slug
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    notFound();
  }

  const doc = querySnapshot.docs[0];
  const product = doc.data() as ProductData;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      {product.imageLink && (
        <Image
          src={product.imageLink}
          alt={product.name}
          width={200}
          height={100}
          className="w-full rounded"
        />
      )}
      {product.shopeeLink && <p className="text-gray-700 mb-4">Shopee: {product.shopeeLink}</p>}
      {product.tiktokshopLink && <p className="text-gray-700 mb-4">TikTok Shop: {product.tiktokshopLink}</p>}
      {product.lazadaLink && <p className="text-gray-700 mb-4">Lazada: {product.lazadaLink}</p>}
      {product.blibliLink && <p className="text-gray-700 mb-4">Blibli: {product.blibliLink}</p>}
      {product.youtubeLink && <p className="text-gray-700 mb-4">YouTube: {product.youtubeLink}</p>}
    </div>
  );
}