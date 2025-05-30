import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore'; // Import DocumentData
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

// Define the type for the component's props
// This is the standard way to type page props in Next.js App Router
interface ProductPageProps {
  params: {
    slug: string;
  };
  // searchParams?: { [key: string]: string | string[] | undefined }; // Include if you use search params
}

export default async function ProductPage({ params }: ProductPageProps) {
  const q = query(collection(db, 'products'), where('slug', '==', params.slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    notFound();
  }

  // It's good practice to ensure you're getting data that matches your ProductData interface
  const doc = querySnapshot.docs[0];
  const product = doc.data() as ProductData; // Type assertion here

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