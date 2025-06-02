import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
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
  category?: string;
  features?: string[];
  specifications?: { [key: string]: string };
  relatedProducts?: string[];
  relatedArticles?: string[];
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const { slug } = await params;
  const q = query(collection(db, 'products'), where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist.',
    };
  }

  const product = querySnapshot.docs[0].data() as ProductData;

  const metaDescription = `${product.name} - ${product.description}${product.features ? `. Fitur: ${product.features.join(', ')}` : ''}. Beli online di Shopee, TikTok Shop, Lazada, dan Blibli.`;

  return {
    title: `${product.name} | Alat Rumah Tangga SNY`,
    description: metaDescription,
    keywords: [...(product.features || []), product.category, 'alat rumah tangga', 'peralatan rumah'].filter(Boolean).join(', '),
    openGraph: {
      title: product.name,
      description: metaDescription,
      images: product.imageLink ? [product.imageLink] : [],
      type: 'website',
      siteName: 'Alat Rumah Tangga SNY',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: metaDescription,
      images: product.imageLink ? [product.imageLink] : [],
    },
    alternates: {
      canonical: `https://alatrumahtanggasny.com/product/${slug}`,
    },
  };
}

export default async function ProductPage(
  { params }: { params: Params}) {
  const { slug } = await params;

  const q = query(collection(db, 'products'), where('slug', '==', slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    notFound();
  }

  const doc = querySnapshot.docs[0];
  const product = doc.data() as ProductData;

  return (
    <div className="min-h-screen bg-background py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {product.category && (
          <nav className="mb-8 text-sm breadcrumbs" aria-label="breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><a href="/" className="text-foreground/60 hover:text-foreground">Home</a></li>
              <li><span className="text-foreground/60 mx-2">/</span></li>
              <li><a href="/product" className="text-foreground/60 hover:text-foreground">Products</a></li>
              <li><span className="text-foreground/60 mx-2">/</span></li>
              <li><a href={`/product`} className="text-foreground/60 hover:text-foreground">{product.category}</a></li>
              <li><span className="text-foreground/60 mx-2">/</span></li>
              <li><span className="text-foreground" aria-current="page">{product.name}</span></li>
            </ol>
          </nav>
        )}
        <div className="bg-background rounded-xl shadow-lg overflow-hidden border border-foreground/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {product.imageLink && (
              <div className="relative h-[400px] lg:h-[600px] w-full">
                <Image
                  src={product.imageLink}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            <div className="p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
                <p className="text-foreground/80 text-lg mb-8 leading-relaxed">{product.description}</p>
                
                {product.features && product.features.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Fitur Utama</h2>
                    <ul className="list-disc list-inside space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="text-foreground/80">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Spesifikasi</h2>
                    <dl className="grid grid-cols-1 gap-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-2">
                          <dt className="text-foreground/60">{key}</dt>
                          <dd className="text-foreground">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
              
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

        {(product.relatedProducts || product.relatedArticles) && (
          <div className="mt-16 space-y-12">
            {product.relatedProducts && product.relatedProducts.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-8">Produk Terkait</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.relatedProducts.map((productSlug, index) => (
                    <a
                      key={index}
                      href={`/product/${productSlug}`}
                      className="block bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-foreground/10"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{productSlug.replace(/-/g, ' ')}</h3>
                        <span className="text-foreground/60">View Details →</span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {product.relatedArticles && product.relatedArticles.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-foreground mb-8">Artikel Terkait</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {product.relatedArticles.map((articleSlug, index) => (
                    <a
                      key={index}
                      href={`/article/${articleSlug}`}
                      className="block bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-foreground/10"
                    >
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{articleSlug.replace(/-/g, ' ')}</h3>
                        <span className="text-foreground/60">Baca Selengkapnya →</span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}