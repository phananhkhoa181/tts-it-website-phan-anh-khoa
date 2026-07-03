"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  addRecentlyViewed: (productId: string) => void;
  cartCount: number;
  wishlistCount: number;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  activeTab: 'cart' | 'wishlist' | 'recent';
  setActiveTab: (tab: 'cart' | 'wishlist' | 'recent') => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'cart' | 'wishlist' | 'recent'>('cart');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('pakwatch_cart');
      const savedWishlist = localStorage.getItem('pakwatch_wishlist');
      const savedRecentlyViewed = localStorage.getItem('pakwatch_recent');

      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedRecentlyViewed) setRecentlyViewed(JSON.parse(savedRecentlyViewed));
    } catch (e) {
      console.error("Failed to load store data", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('pakwatch_cart', JSON.stringify(cart));
      localStorage.setItem('pakwatch_wishlist', JSON.stringify(wishlist));
      localStorage.setItem('pakwatch_recent', JSON.stringify(recentlyViewed));
    }
  }, [cart, wishlist, recentlyViewed, isLoaded]);

  const addToCart = (productId: string, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === productId);
      if (existing) {
        return prev.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const product = products.find(p => p.id === productId);
      if (product) {
        return [...prev, { product, quantity }];
      }
      return prev;
    });
    showToast("Đã thêm vào giỏ hàng");
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast("Đã bỏ khỏi yêu thích");
        return prev.filter(id => id !== productId);
      } else {
        showToast("Đã lưu vào yêu thích");
        return [...prev, productId];
      }
    });
  };

  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10); // Keep max 10
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <StoreContext.Provider value={{
      cart,
      wishlist,
      recentlyViewed,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleWishlist,
      addRecentlyViewed,
      cartCount,
      wishlistCount,
      isSidebarOpen,
      setIsSidebarOpen,
      activeTab,
      setActiveTab,
      toastMessage,
      showToast
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
