import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Image from 'next/image';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const q = query(collection(db, 'products'), where('slug', '==', params.slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    notFound();
  }

  const doc = querySnapshot.docs[0];
  const product = doc.data();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      {product.imageLink && (
        <Image src={product.imageLink} alt={product.name} className="w-full rounded" />
      )}
      <p className="text-gray-700 mb-4">{product.shopeeLink}</p>
      <p className="text-gray-700 mb-4">{product.tiktokshopLink}</p>
      <p className="text-gray-700 mb-4">{product.lazadaLink}</p>
      <p className="text-gray-700 mb-4">{product.blibliLink}</p>
      <p className="text-gray-700 mb-4">{product.youtubeLink}</p>
    </div>
  );
}