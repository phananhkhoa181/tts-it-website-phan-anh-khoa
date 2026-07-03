import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Heart, ShoppingBag, ChevronRight, ChevronLeft } from 'lucide-react';
import { Product } from '../../data/products';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const { t } = useLanguage();
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300); // Wait for animation
  };

  const nextImage = () => {
    setCurrentImageIdx((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIdx((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] transition-all duration-300 transform ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Gallery */}
        <div className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-800/50 p-6 flex flex-col">
          <div className="relative flex-grow aspect-square mb-4 rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image 
                  src={product.images[currentImageIdx]} 
                  alt={`${product.name} - Image ${currentImageIdx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-4"
                />
              </motion.div>
            </AnimatePresence>
            {product.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors backdrop-blur-sm">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 shadow-md hover:bg-white dark:hover:bg-slate-700 transition-colors backdrop-blur-sm">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
          
          {/* Thumbnail list */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentImageIdx(idx)}
                className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${currentImageIdx === idx ? 'border-indigo-500 shadow-md' : 'border-transparent bg-white dark:bg-slate-800 opacity-60 hover:opacity-100'}`}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>

          {/* Action Buttons moved to left side */}
          <div className="flex gap-4 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700/50">
            <button 
              onClick={() => {
                addToCart(product.id);
                handleClose();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg transform active:scale-95"
            >
              <ShoppingBag className="w-5 h-5" />
              Thêm vào giỏ
            </button>
            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`p-4 rounded-xl border-2 flex items-center justify-center transition-all duration-300 transform active:scale-95 ${
                isWishlisted 
                  ? 'border-red-500 bg-red-50 dark:bg-red-500/10 text-red-500' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto" data-lenis-prevent="true">
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-4 h-4 rounded-full border border-slate-300 shadow-inner"
              style={{ backgroundColor: product.colorHex }}
            />
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {product.colorName}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            {product.name}
          </h2>

          <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-8">
            {product.price}
          </div>

          <div className="space-y-6 mb-8 flex-grow">
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {/* @ts-ignore */}
                {t.store?.featuresTitle || "Features"}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                {/* @ts-ignore */}
                {t.products?.[product.id]?.features}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                {/* @ts-ignore */}
                {t.store?.descTitle || "Description"}
              </h4>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                {/* @ts-ignore */}
                {t.products?.[product.id]?.description?.map((point: string, idx: number) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
