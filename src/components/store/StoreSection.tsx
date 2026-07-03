"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { products, Product } from '../../data/products';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import ProductModal from './ProductModal';

export default function StoreSection() {
  const { toggleWishlist, wishlist, addToCart, addRecentlyViewed } = useStore();
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    addRecentlyViewed(product.id);
  };

  return (
    <section id="store" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl mb-4 text-slate-900 dark:text-white">

            {t.storeSection?.title || "Bộ Sưu Tập Của Chúng Tôi"}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">

            {t.storeSection?.desc || "Chọn phiên bản Apple Watch phù hợp với phong cách của bạn."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div key={product.id} className="group flex flex-col bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image Container */}
                <div 
                  className="relative aspect-square cursor-pointer overflow-hidden bg-slate-100 dark:bg-slate-800"
                  onClick={() => handleProductClick(product)}
                >
                  <Image 
                    src={product.images[0]} 
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Action Buttons Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                      aria-label="Thêm vào yêu thích"
                      className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-700 hover:text-red-500 transition-colors shadow-sm"
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleProductClick(product); }}
                      aria-label="Xem chi tiết"
                      className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white hover:bg-white dark:hover:bg-slate-700 hover:text-indigo-500 transition-colors shadow-sm"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600 shadow-inner"
                      style={{ backgroundColor: product.colorHex }}
                    />
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {product.colorName}
                    </span>
                  </div>
                  
                  <h3 
                    className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    onClick={() => handleProductClick(product)}
                  >
                    {product.name}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {product.price}
                    </span>
                    <button 
                      onClick={() => addToCart(product.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:text-white transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4" />
          
                      <span>{t.storeSection?.addBtn || "Thêm"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
}
