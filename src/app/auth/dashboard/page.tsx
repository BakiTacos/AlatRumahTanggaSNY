'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

interface ProductForm {
  name: string;
  description: string;
  category: string;
  imageLink: string;
  youtubeLink: string;
  tiktokshopLink: string;
  shopeeLink: string;
  lazadaLink: string;
  blibliLink: string;
}

interface ArticleForm {
  title: string;
  description: string;
  content: string;
  author: string; // Add the author field
  imageUrl: string;
  readingTime: string;
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphens
    .replace(/(^-|-$)+/g, '');   // remove starting/ending hyphens
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formType, setFormType] = useState<'product' | 'article'>('product');
  const [productForm, setProductForm] = useState<ProductForm>({
    name: '',
    description: '',
    category: '',
    imageLink: '',
    youtubeLink: '',
    tiktokshopLink: '',
    shopeeLink: '',
    lazadaLink: '',
    blibliLink: ''
  });
  const [articleForm, setArticleForm] = useState<ArticleForm>({
    title: '',
    description: '',
    content: '',
    author: '', // Add the author field
    imageUrl: '',
    readingTime: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        router.push('/auth');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const generateId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      const productId = generateId();
      const slug = generateSlug(productForm.name);
  
      const docRef = doc(collection(db, 'products'), productId);
      await setDoc(docRef, {
        id: productId,
        slug,
        ...productForm,
        createdAt: new Date().toISOString()
      });
  
      setSuccess('Product added successfully!');
      setProductForm({
        name: '',
        description: '',
        category: '',
        imageLink: '',
        youtubeLink: '',
        tiktokshopLink: '',
        shopeeLink: '',
        lazadaLink: '',
        blibliLink: ''
      });
    } catch (error) {
      console.log(error);
      setError('Failed to add product. Please try again.');
    }
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    try {
      const articleId = generateId();
      const slug = generateSlug(articleForm.title);
  
      const docRef = doc(collection(db, 'articles'), articleId);
      await setDoc(docRef, {
        id: articleId,
        slug,
        ...articleForm,
        createdAt: new Date().toISOString()
      });
  
      setSuccess('Article added successfully!');
      setArticleForm({
        title: '',
        description: '',
        content: '',
        author: '', // Add the author field
        imageUrl: '',
        readingTime: ''
      });
    } catch (error) {
      console.log(error);
      setError('Failed to add article. Please try again.');
    }
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArticleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setArticleForm((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setFormType('product')}
            className={`px-4 py-2 rounded-md ${formType === 'product' ? 'bg-[#A5D6A7] text-white' : 'bg-gray-200'}`}
          >
            Add Product
          </button>
          <button
            onClick={() => setFormType('article')}
            className={`px-4 py-2 rounded-md ${formType === 'article' ? 'bg-[#A5D6A7] text-white' : 'bg-gray-200'}`}
          >
            Add Article
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        {formType === 'product' ? (
          <form onSubmit={handleProductSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleProductChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleProductChange}
                required
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={productForm.category}
                onChange={handleProductChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              >
                <option value="">Select a category</option>
                <option value="dapur">Dapur</option>
                <option value="kamar-mandi">Kamar Mandi</option>
                <option value="kamar-tidur">Kamar Tidur</option>
                <option value="ruang-tamu">Ruang Tamu</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image Link</label>
              <input
                type="url"
                name="imageLink"
                value={productForm.imageLink}
                onChange={handleProductChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
              <input
                type="url"
                name="youtubeLink"
                value={productForm.youtubeLink}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">TikTok Shop Link</label>
              <input
                type="url"
                name="tiktokshopLink"
                value={productForm.tiktokshopLink}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Shopee Link</label>
              <input
                type="url"
                name="shopeeLink"
                value={productForm.shopeeLink}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Lazada Link</label>
              <input
                type="url"
                name="lazadaLink"
                value={productForm.lazadaLink}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Blibli Link</label>
              <input
                type="url"
                name="blibliLink"
                value={productForm.blibliLink}
                onChange={handleProductChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A5D6A7] hover:bg-[#81C784] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A5D6A7]"
            >
              Add Product
            </button>
          </form>
        ) : (
          <form onSubmit={handleArticleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700">Article Title</label>
              <input
                type="text"
                name="title"
                value={articleForm.title}
                onChange={handleArticleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={articleForm.description}
                onChange={handleArticleChange}
                required
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                name="content"
                value={articleForm.content}
                onChange={handleArticleChange}
                required
                rows={8}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <textarea
                name="author"
                value={articleForm.author}
                onChange={handleArticleChange}
                required
                rows={8}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Reading Time</label>
              <textarea
                name="readingTime"
                value={articleForm.readingTime}
                onChange={handleArticleChange}
                required
                rows={8}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={articleForm.imageUrl}
                onChange={handleArticleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#A5D6A7] hover:bg-[#81C784] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A5D6A7]"
            >
              Add Article
            </button>
          </form>
        )}
      </div>
    </div>
  );
}