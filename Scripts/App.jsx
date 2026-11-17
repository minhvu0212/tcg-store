import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import ToastContainer from './components/ToastContainer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import AdminDashboard from './pages/AdminDashboard';

function AppContent() {
  const { currentRoute } = useStore();

  const renderCurrentPage = () => {
    if (currentRoute === 'home' || currentRoute === '') {
      return <Home />;
    }
    if (currentRoute === 'shop') {
      return <Shop />;
    }
    if (currentRoute.startsWith('product/')) {
      return <ProductDetail />;
    }
    if (currentRoute === 'cart') {
      return <Cart />;
    }
    if (currentRoute === 'checkout') {
      return <Checkout />;
    }
    if (currentRoute === 'wishlist') {
      return <Wishlist />;
    }
    if (currentRoute === 'profile') {
      return <Profile />;
    }
    if (currentRoute === 'orders') {
      return <Orders />;
    }
    if (currentRoute === 'login') {
      return <Login />;
    }
    if (currentRoute === 'register') {
      return <Register />;
    }
    if (currentRoute === 'news') {
      return <News />;
    }
    if (currentRoute.startsWith('news/')) {
      return <NewsDetail />;
    }
    if (currentRoute === 'about') {
      return <About />;
    }
    if (currentRoute === 'contact') {
      return <Contact />;
    }
    if (currentRoute === 'faq') {
      return <FAQ />;
    }
    if (currentRoute === 'admin') {
      return <AdminDashboard />;
    }

    // Default fallback
    return <Home />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090B12] text-[#F5F5F7] font-sans selection:bg-[#8957E5]/30 selection:text-[#F5F5F7]">
      <Header />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      
      {/* Global Modals & Notifications */}
      <QuickViewModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
