import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Hash-based navigation with fallback
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash.replace('#', '') || 'home';
    return hash;
  });

  // Selected product ID for detail page
  const [selectedProductId, setSelectedProductId] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('product/')) {
      return hash.replace('product/', '');
    }
    return 'ygo-01';
  });

  // Selected article ID for news detail
  const [selectedNewsId, setSelectedNewsId] = useState('news-01');

  // Active Category filter when navigating directly
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('tcg_cart');
      return saved ? JSON.parse(saved) : [
        { product: products[0], quantity: 1 },
        { product: products[10], quantity: 1 }
      ];
    } catch (e) {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('tcg_wishlist');
      return saved ? JSON.parse(saved) : ['ygo-01', 'pkm-01', 'op-01'];
    } catch (e) {
      return [];
    }
  });

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // User state (demo)
  const [user, setUser] = useState({
    name: 'Alexander Collector',
    email: 'alex.collector@tcgstore.com',
    tier: 'Platinum VIP',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    points: 4850
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tcg_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('tcg_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // Listen to hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentRoute(hash);
      if (hash.startsWith('product/')) {
        const id = hash.replace('product/', '');
        setSelectedProductId(id);
      } else if (hash.startsWith('news/')) {
        const id = hash.replace('news/', '');
        setSelectedNewsId(id);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route) => {
    window.location.hash = route;
    setCurrentRoute(route);
    if (route.startsWith('product/')) {
      setSelectedProductId(route.replace('product/', ''));
    } else if (route.startsWith('news/')) {
      setSelectedNewsId(route.replace('news/', ''));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(
      'Added to Cart',
      `${product.name} (${quantity}x) added to your vault cart.`,
      'gold'
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Item Removed', 'Product removed from your cart.', 'info');
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    if (wishlist.includes(product.id)) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      addToast('Removed from Wishlist', `${product.name} removed from your saved list.`, 'info');
    } else {
      setWishlist((prev) => [...prev, product.id]);
      addToast('Added to Wishlist', `${product.name} saved to your grail wishlist.`, 'gold');
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        currentRoute,
        navigate,
        selectedProductId,
        setSelectedProductId,
        selectedNewsId,
        setSelectedNewsId,
        categoryFilter,
        setCategoryFilter,
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        addToast,
        removeToast,
        user,
        setUser
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
