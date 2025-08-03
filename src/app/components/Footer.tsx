import Image from 'next/image';

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#333333] text-white py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Simple and Yours</h3>
            <p className="text-gray-300">
              Kualitas terbaik untuk memenuhi kebutuhan anda.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Kontak Kami</h3>
            <p className="text-gray-300">Phone: +6282114721104</p>
            <p className="text-gray-300">Email: sny.osho@gmail.com</p>
            <p className="text-gray-300">Alamat: Benda, Kota Tangerang</p>
          </div>
              <div>
              <h3 className="text-xl font-bold mb-4">Sosial Media Kami</h3>
              <div className="flex space-x-4">
                <a href="https://wa.me/6282114721104" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500" aria-label="Tiktok">
                  <Image
                    src="https://raw.githubusercontent.com/BakiTacos/image-host/1f662a276674c9b403cd2db21c548222f5bcba93/AlatRumahTanggaSNY/SVG/whatsapp.svg"
                    alt="whatsapp"
                    width={200}
                    height={100}
                    className="w-6 h-6"
                  />
                </a>
                <a href="https://www.youtube.com/@snystore" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500" aria-label="YouTube">
                  <Image
                    src="https://raw.githubusercontent.com/BakiTacos/image-host/20072cf11e73fbec3ebc67a98ecacb015393329d/AlatRumahTanggaSNY/SVG/youtube.svg"
                    alt="YouTube"
                    width={200}
                    height={100}
                    className="w-6 h-6"
                  />
                </a>
                <a href="shopee.co.id/sny_onlineshop" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500" aria-label="Shopee">
                  <Image
                    src="https://raw.githubusercontent.com/BakiTacos/image-host/cffdd38bff910a592cec800b556157ed550d6ef3/AlatRumahTanggaSNY/SVG/shopee.svg"
                    alt="shopee"
                    width={200}
                    height={100}
                    className="w-6 h-6"
                  />
                </a>
                <a href="https://www.tokopedia.com/snyonlineshop" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-500" aria-label="Tiktok">
                  <Image
                    src="https://raw.githubusercontent.com/BakiTacos/image-host/cffdd38bff910a592cec800b556157ed550d6ef3/AlatRumahTanggaSNY/SVG/tiktok.svg"
                    alt="tiktok"
                    width={200}
                    height={100}
                    className="w-6 h-6"
                  />
                </a>
              </div>
        </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Simple and Yours.</p>
        </div>
      </div>
    </footer>
  );
}