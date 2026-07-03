"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingBag, Clock, Trash2, Plus, Minus, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext';
import { products } from '../../data/products';

export default function CartSidebar() {
  const { 
    isSidebarOpen, 
    setIsSidebarOpen, 
    cart, 
    wishlist, 
    recentlyViewed, 
    removeFromCart, 
    updateQuantity, 
    toggleWishlist,
    activeTab,
    setActiveTab
  } = useStore();
  const { t } = useLanguage();
  
  const cartTotal = cart.reduce((total, item) => total + (item.product.priceValue * item.quantity), 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] transition-opacity"
        onClick={() => setIsSidebarOpen(false)}
      />
      
      {/* Sidebar Drawer */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white dark:bg-slate-900 z-[120] shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0 border-l border-slate-200 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">

            {t.sidebar?.title || "Cửa hàng"}
          </h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-2 bg-slate-50 dark:bg-slate-800/50">
          <button 
            onClick={() => setActiveTab('cart')}
            className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'cart' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            <ShoppingBag className="w-4 h-4" /> 

            {t.sidebar?.tabCart || "Giỏ hàng"}
            {cartCount > 0 && (
              <span className="absolute top-1 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('wishlist')}
            className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'wishlist' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            <Heart className="w-4 h-4" /> 

            {t.sidebar?.tabWishlist || "Yêu thích"}
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-2 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('recent')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'recent' ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            <Clock className="w-4 h-4" /> 

            {t.sidebar?.tabRecent || "Đã xem"}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          
          {/* Cart Tab */}
          {activeTab === 'cart' && (
            <div className="space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>
        
                    {t.sidebar?.emptyCart || "Giỏ hàng của bạn đang trống"}
                  </p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.product.id} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-700">
                      <Image src={item.product.images[0]} alt={item.product.name} fill sizes="80px" className="object-cover p-2" />
                    </div>
                    <div className="flex flex-col flex-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">{item.product.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{item.product.colorName}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{item.product.price}</span>
                        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-700 px-2 py-1">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"><Plus className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id)} className="self-start p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              {wishlist.length === 0 ? (
                <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                  <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>
        
                    {t.sidebar?.emptyWishlist || "Chưa có sản phẩm yêu thích"}
                  </p>
                </div>
              ) : (
                wishlist.map(id => {
                  const product = products.find(p => p.id === id);
                  if (!product) return null;
                  return (
                    <div key={product.id} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-700">
                        <Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-cover p-2" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mb-1">{product.name}</h4>
                        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-auto">{product.price}</span>
                      </div>
                      <button onClick={() => toggleWishlist(product.id)} className="self-start p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors">
                        <Heart className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Recently Viewed Tab */}
          {activeTab === 'recent' && (
            <div className="space-y-6">
              {recentlyViewed.length === 0 ? (
                <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>
        
                    {t.sidebar?.emptyRecent || "Bạn chưa xem sản phẩm nào"}
                  </p>
                </div>
              ) : (
                recentlyViewed.map(id => {
                  const product = products.find(p => p.id === id);
                  if (!product) return null;
                  return (
                    <div key={product.id} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800/50 opacity-80 hover:opacity-100 transition-opacity">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-700">
                        <Image src={product.images[0]} alt={product.name} fill sizes="64px" className="object-cover p-2" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-1">{product.name}</h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{product.price}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer (Cart only) */}
        {activeTab === 'cart' && cart.length > 0 && (
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
    
                {t.sidebar?.total || "Tổng cộng"}
              </span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                {cartTotal.toLocaleString('vi-VN')}đ
              </span>
            </div>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg transform active:scale-95">
  
              {t.sidebar?.checkout || "Tiến hành thanh toán"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
