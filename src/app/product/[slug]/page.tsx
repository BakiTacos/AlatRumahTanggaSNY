// app/products/[slug]/page.tsx
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type PageProps = {
  params: {
    slug: string;
  };
};

type Product = {
  name: string;
  description: string;
  imageLink?: string;
};

export default async function Page({ params }: PageProps) {
  const q = query(collection(db, 'products'), where('slug', '==', params.slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) notFound();

  const product = snapshot.docs[0].data() as Product;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="mb-4">{product.description}</p>
      {product.imageLink && (
        <Image
          src={product.imageLink}
          alt={product.name}
          width={600}
          height={400}
          className="rounded-lg"
        />
      )}
    </div>
  );
}