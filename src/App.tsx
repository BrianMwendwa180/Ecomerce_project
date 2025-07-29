import React from 'react';
import { useState, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import { Filter } from 'lucide-react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import Checkout from './components/Checkout';
import FilterSidebar from './components/FilterSidebar';
import { products } from './data/products';
import { Product } from './types';
import Footer from './components/Footer';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('name');

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(product => product.category)));
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product: Product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Header
            onCartClick={() => setIsCartOpen(true)}
            onAuthClick={() => setIsAuthModalOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Sidebar */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-24">
                  <FilterSidebar
                    isOpen={true}
                    onClose={() => {}}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {selectedCategory || 'All Products'}
                    </h1>
                    <p className="text-gray-600 mt-1">
                      {filteredAndSortedProducts.length} products found
                    </p>
                  </div>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 transition-colors"
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </button>
                </div>

                <ProductGrid products={filteredAndSortedProducts} />
              </div>
            </div>
          </main>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Modals */}
          <Cart
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            onCheckout={() => {
              setIsCartOpen(false);
              setIsCheckoutOpen(true);
            }}
          />

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />

          <Checkout
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
          />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
