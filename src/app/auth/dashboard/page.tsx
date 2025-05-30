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

export default function Dashboard() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductForm>({
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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/auth');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const generateProductId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const productId = generateProductId();
      const docRef = doc(collection(db, 'products'), productId);
      await setDoc(docRef, {
        id: productId,
        ...formData,
        createdAt: new Date().toISOString()
      });

      setSuccess('Product added successfully!');
      setFormData({
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Add New Product</h1>
        
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

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
            />
          </div>

          <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
          >
            <option value="">Select a category</option>
            <option value="fashion">Fashion</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home</option>
            <option value="sports">Sports</option>
            <option value="books">Books</option>
          </select>
        </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image Link</label>
            <input
              type="url"
              name="imageLink"
              value={formData.imageLink}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">YouTube Link</label>
            <input
              type="url"
              name="youtubeLink"
              value={formData.youtubeLink}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">TikTok Shop Link</label>
            <input
              type="url"
              name="tiktokshopLink"
              value={formData.tiktokshopLink}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Shopee Link</label>
            <input
              type="url"
              name="shopeeLink"
              value={formData.shopeeLink}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lazada Link</label>
            <input
              type="url"
              name="lazadaLink"
              value={formData.lazadaLink}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#A5D6A7] focus:border-[#A5D6A7]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Blibli Link</label>
            <input
              type="url"
              name="blibliLink"
              value={formData.blibliLink}
              onChange={handleChange}
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
      </div>
    </div>
  );
}