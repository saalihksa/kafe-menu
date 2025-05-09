/* eslint-disable */
'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MenuCard from '@/components/MenuCard';
import menuData from '@/data/menu';
import categories, { Category } from '@/data/categories';
import { notFound, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaCookieBite, FaCoffee, FaBreadSlice, FaTimes, FaPlus } from 'react-icons/fa';

// Tüm dinamik parametrelerin oluşturulmasına izin vermek için
export const dynamic = 'force-dynamic';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const slug = params.slug; // Slug'ı bir değişkene alalım
  const [showExtrasPopup, setShowExtrasPopup] = useState(false);
  
  // useEffect ile sayfa yüklendiğinde kontrol yapalım
  useEffect(() => {
    const category = categories.find((c: Category) => c.slug === slug);
    if (!category) {
      notFound();
    }
  }, [slug]);
  
  const category = categories.find((c: Category) => c.slug === slug);
  
  // Eğer kategori yoksa, notFound işlemi useEffect içinde yapılacak
  if (!category) {
    // Client-side olduğu için burada bir fallback UI döndürelim
    return <div className="min-h-screen flex flex-col items-center justify-center">Yükleniyor...</div>;
  }

  // Menü verilerinden bu kategoriye ait olanları filtreleme
  const filteredItems = menuData
    .flatMap((menuCategory) => menuCategory.items)
    .filter((item) => {
      // Slug değerine göre doğrudan filtreleme yapıyoruz
      // DÜZELTME: Ürünün category ID'si ile mevcut kategorinin ID'sini karşılaştır
      return item.category === category.id;
    });

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(33,33,33,0.2)] to-[rgba(33,33,33,0.1)] z-10"></div>
        {category.image ? (
          <Image 
            src={category.image} 
            alt={category.title} 
            fill 
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[var(--accent-light)] to-[var(--accent)]"></div>
        )}
      </div>

      {/* Sabit Ana Sayfaya Dön butonu */}
      {!showExtrasPopup && (
        <motion.div 
          className="fixed top-24 left-4 z-[51] sm:left-6 md:left-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <button 
            onClick={(e) => {
              e.preventDefault();
              router.push('/menu');
            }}
            className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-3.5 sm:px-4 py-2.5 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary-dark)]"
          >
            <motion.div 
              className="flex items-center justify-center"
              whileHover={{ x: -2 }}
              transition={{ duration: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <span className="text-sm sm:text-base font-medium">Geri Dön</span>
          </button>
        </motion.div>
      )}
      
      {/* Yeni Ekstralar Butonu */}
      {category && category.id === 'sandvicler' && !showExtrasPopup && (
        <motion.div 
          className="fixed top-24 right-4 z-[51] sm:right-6 md:right-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <button 
            onClick={() => setShowExtrasPopup(true)}
            className="group flex items-center justify-center gap-1.5 sm:gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-3.5 sm:px-4 py-2.5 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary-dark)]"
          >
            <FaPlus className="h-4 w-4 sm:h-5 sm:w-5 transition-colors" />
            <span className="text-sm sm:text-base font-medium">Ekstralar</span>
          </button>
        </motion.div>
      )}
      
      <main className="flex-1 py-8 sm:py-10 md:py-12 px-4 bg-[var(--background)] -mt-10 relative z-30 rounded-t-3xl">
        <div className="max-w-6xl mx-auto">
          {/* Başlık alanı - Görseldeki gibi modern tasarım */}
          <motion.div
            className="mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Ürün sayısı - Üstte ortalanmış */}
            <div className="flex flex-col items-center justify-center text-center mb-5">
              <div className="inline-block mb-4 bg-[var(--accent)] text-[var(--foreground)] text-xs uppercase tracking-wider py-1.5 px-4 rounded-full font-medium shadow-sm">
                {filteredItems.length} ÜRÜN
              </div>
              
              {/* Görseldeki gibi altı sarı çizgili başlık - Tam ortalanmış */}
              <h1 className="text-center text-[38px] sm:text-[44px] md:text-[50px] font-display font-semibold text-[#3d3d3d] relative inline-flex items-center justify-center mx-auto tracking-tight">
                {category.title}
                {category.group === 'tatlilar' && (
                  <FaCookieBite className="ml-2 sm:ml-3 text-[var(--primary)] text-[26px] sm:text-[30px] md:text-[34px]" />
                )}
                {category.group === 'icecekler' && (
                  <FaCoffee className="ml-2 sm:ml-3 text-[var(--primary)] text-[26px] sm:text-[30px] md:text-[34px]" />
                )}
                {category.group === 'bakery' && (
                  <FaBreadSlice className="ml-2 sm:ml-3 text-[var(--primary)] text-[26px] sm:text-[30px] md:text-[34px]" />
                )}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-[var(--primary)] rounded-full"></div>
              </h1>
            </div>
            
            {/* Kategori açıklaması - Ortalanmış */}
            {category.description && (
              <motion.p 
                className="text-center text-lg sm:text-xl text-[#696969] leading-relaxed mt-4 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {category.description}
              </motion.p>
            )}
          </motion.div>

          {filteredItems.length > 0 ? (
            <motion.div 
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4 auto-rows-fr"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {filteredItems.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="h-full"
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16 px-4 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[var(--primary-dark)] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-xl text-primary font-medium mb-2">
                Bu kategoride henüz ürün bulunmamaktadır.
              </p>
              <p className="text-[var(--text-muted)] mb-4">Daha sonra tekrar kontrol edebilirsiniz.</p>
              <Link href="/" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition duration-200">
                Diğer Kategorilere Göz At
              </Link>
            </motion.div>
          )}

          {/* Pop-up Modal JSX'i Başlangıcı */}
          {category && category.id === 'sandvicler' && showExtrasPopup && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowExtrasPopup(false)}
            >
              <motion.div
                className="bg-[var(--card-bg)] p-3 rounded-xl shadow-2xl w-[92%] max-w-[320px] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl sm:p-5 md:p-6 relative text-center border border-[var(--border)]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setShowExtrasPopup(false)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 text-[var(--foreground)] hover:text-[var(--primary)] transition-colors p-2 rounded-full z-[101]"
                  aria-label="Kapat"
                >
                  <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <h2 className="text-xl sm:text-2xl font-display font-semibold text-[var(--primary)] mb-1">
                  Sandviç Ekstraları
                </h2>
                <p className="text-sm text-gray-600 mt-1 mb-3 sm:mb-4">
                  Sandviçinize lezzet katacak ekstralarımızı keşfedin.
                </p>
                <p className="text-gray-700 text-xs sm:text-sm mb-0.5 sm:mb-1">
                  *İsteğe göre sandviçinize fesleğenli acı zeytinyağı eklenebilir.
                </p>
                <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4">
                  *Cumartesi günleri özel foccacia ekmeğimiz mevcuttur.
                </p>
                
                <div className="grid grid-cols-2 gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-3 sm:gap-y-4 text-left">
                  <div>
                    <h3 className="text-[var(--primary)] font-semibold mb-2 sm:mb-2.5 text-base border-b border-[var(--border)] pb-1.5 sm:pb-2">
                      Şarküteri (50gr):
                    </h3>
                    <ul className="">
                      <li className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                        <span className="text-gray-700 text-xs sm:text-sm">Füme Kaburga:</span>
                        <span className="font-medium text-xs sm:text-sm text-[var(--foreground)]">75₺</span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                        <span className="text-gray-700 text-xs sm:text-sm">İtalyan Salamı:</span>
                        <span className="font-medium text-xs sm:text-sm text-[var(--foreground)]">90₺</span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                        <span className="text-gray-700 text-xs sm:text-sm">Antrikot Füme:</span>
                        <span className="font-medium text-xs sm:text-sm text-[var(--foreground)]">140₺</span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                        <span className="text-gray-700 text-xs sm:text-sm">Dana Jambon:</span>
                        <span className="font-medium text-xs sm:text-sm text-[var(--foreground)]">65₺</span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                        <span className="text-gray-700 text-xs sm:text-sm">Roastbeef:</span>
                        <span className="font-medium text-xs sm:text-sm text-[var(--foreground)]">140₺</span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                        <span className="text-gray-700 text-xs sm:text-sm">Hindi Füme:</span>
                        <span className="font-medium text-xs sm:text-sm text-[var(--foreground)]">45₺</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-[var(--primary)] font-semibold mb-2 sm:mb-2.5 text-base border-b border-[var(--border)] pb-1.5 sm:pb-2">
                      Peynir (50gr):
                    </h3>
                    <ul className="">
                      <li className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                        <span className="text-gray-700 text-xs sm:text-sm">Kars Kaşarı:</span>
                        <span className="font-medium text-xs sm:text-sm text-[var(--foreground)]">45₺</span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                        <span className="text-gray-700 text-xs sm:text-sm">Kars Gravyer:</span>
                        <span className="font-medium text-xs sm:text-sm text-[var(--foreground)]">75₺</span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                        <span className="text-gray-700 text-xs sm:text-sm">Trakya Eski Kaşar:</span>
                        <span className="font-medium text-xs sm:text-sm text-[var(--foreground)]">55₺</span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                        <span className="text-gray-700 text-xs sm:text-sm">Mozarella Peyniri:</span>
                        <span className="font-medium text-xs sm:text-sm text-[var(--foreground)]">45₺</span>
                      </li>
                      <li className="flex justify-between items-center py-2 border-b border-[var(--border)] last:border-b-0">
                        <span className="text-gray-700 text-xs sm:text-sm">Van Otlu Peynir:</span>
                        <span className="font-medium text-xs sm:text-sm text-[var(--foreground)]">45₺</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <button 
                    onClick={() => setShowExtrasPopup(false)}
                    className="mt-4 sm:mt-6 w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary-dark)] focus:ring-offset-[var(--card-bg)]"
                  >
                    Kapat
                  </button>
              </motion.div>
            </motion.div>
          )}
          {/* Pop-up Modal JSX'i Sonu */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 