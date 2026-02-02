import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import AdminPanel from './components/AdminPanel';
import EditPanel from './components/EditPanel';
import Footer from './components/Footer';
import UserPanel from './components/UserPanel';
import CartPanel from './components/CartPanel';
import SearchOverlay from './components/SearchOverlay';
import Regulamin from './pages/Regulamin';
import PolitykaPrywatnosci from './pages/PolitykaPrywatnosci';
import ONas from './pages/ONas';
import Kontakt from './pages/Kontakt';
import Dostawa from './pages/Dostawa';
import MetodyPlatnosci from './pages/MetodyPlatnosci';
import ZwrotyIWymiany from './pages/ZwrotyIWymiany';
import ProductPage from './pages/ProductPage';
import { motion } from 'framer-motion';

const App = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [primaryColor, setPrimaryColor] = useState('#D35400');
  const [products, setProducts] = useState([
    { id: 1, name: 'Liofilizowana Truskawka', price: 24.99, category: 'Owoce - Owoce liofilizowane', description: 'Chrupiące plastry dojrzałych truskawek, liofilizowane dla zachowania pełnego smaku i witamin.' },
    { id: 2, name: 'Orzechy w Czekoladzie', price: 18.50, category: 'Słodycze - Orzechy w czekoladzie', description: 'Wyselekcjonowane orzechy laskowe w aksamitnej, mlecznej czekoladzie.' },
    { id: 3, name: 'Herbatka Różana', price: 15.99, category: 'Herbaty - Herbaty owocowe', description: 'Aromatyczna mieszanka liściastej herbaty z płatkami jadalnych róż.' }
  ]);

  const [orders, setOrders] = useState([
    {
      id: 'ORD-12345',
      customer: { name: 'Jan Kowalski', email: 'jan@example.pl', phone: '123456789' },
      date: '2026-02-01',
      paymentStatus: 'Paid',
      shippingMethod: 'InPost Paczkomat',
      shippingAddress: 'Paczkomat WAW123, ul. Marszałkowska 1, 00-001 Warszawa',
      orderStatus: 'New',
      products: [{ name: 'Liofilizowana Truskawka', quantity: 2, price: 24.99 }],
      total: 49.98
    },
    {
      id: 'ORD-12346',
      customer: { name: 'Anna Nowak', email: 'anna@example.pl', phone: '987654321' },
      date: '2026-02-02',
      paymentStatus: 'Pending',
      shippingMethod: 'DPD Kurier',
      shippingAddress: 'ul. Nowy Świat 10, 00-002 Warszawa',
      orderStatus: 'New',
      products: [{ name: 'Orzechy w Czekoladzie', quantity: 1, price: 18.50 }],
      total: 18.50
    }
  ]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('bitgits_products');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      if (parsed.length > 0) setProducts(parsed);
    }

    const savedOrders = localStorage.getItem('bitgits_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    const savedColor = localStorage.getItem('bitgits_primary_color');
    if (savedColor) {
      setPrimaryColor(savedColor);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    localStorage.setItem('bitgits_primary_color', primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    localStorage.setItem('bitgits_orders', JSON.stringify(orders));
  }, [orders]);

  const handleUpdateOrder = (updatedOrder) => {
    const updated = orders.map(o => o.id === updatedOrder.id ? updatedOrder : o);
    setOrders(updated);
  };

  const handleUpdateColor = (newColor) => {
    setPrimaryColor(newColor);
  };

  const handleAddProduct = (newProduct) => {
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem('bitgits_products', JSON.stringify(updated));
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(updated);
    localStorage.setItem('bitgits_products', JSON.stringify(updated));
  };

  const handleDeleteProduct = (id) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('bitgits_products', JSON.stringify(updated));
  };

  const handleOpenEdit = (product) => {
    setProductToEdit(product);
    setIsEditOpen(true);
  };

  const CategoryView = () => {
    const { categoryPath } = useParams();
    // Helper to map URL path to category name
    const formatCategoryName = (path) => {
      if (!path) return null;
      return path.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
      <ProductGrid
        products={products}
        onEdit={handleOpenEdit}
        selectedCategory={formatCategoryName(categoryPath)}
        isAdmin={isAdminLoggedIn}
        onAddToCart={addToCart}
      />
    );
  };

  const [cartItems, setCartItems] = useState([]);

  // Load cart when user changes
  useEffect(() => {
    if (loggedInUser) {
      const savedCart = localStorage.getItem(`bitgits_cart_${loggedInUser.email}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]);
    }
  }, [loggedInUser]);

  const addToCart = (product) => {
    if (!loggedInUser) {
      setIsUserOpen(true); // Open login if not logged in
      return;
    }
    const updatedCart = [...cartItems, { ...product, cartId: Date.now() }];
    setCartItems(updatedCart);
    localStorage.setItem(`bitgits_cart_${loggedInUser.email}`, JSON.stringify(updatedCart));
    setIsCartOpen(true); // Open cart to show added item
  };

  const removeFromCart = (cartId) => {
    if (!loggedInUser) return;
    const updatedCart = cartItems.filter(item => item.cartId !== cartId);
    setCartItems(updatedCart);
    localStorage.setItem(`bitgits_cart_${loggedInUser.email}`, JSON.stringify(updatedCart));
  };

  const PagePlaceholder = ({ title }) => (
    <div style={{ paddingTop: '120px', textAlign: 'center', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '3rem', color: 'var(--primary-color)' }}>{title}</h1>
      <p style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>Ta strona jest w budowie. Zapraszamy wkrótce!</p>
    </div>
  );

  return (
    <div className="app">
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenUser={() => setIsUserOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <ProductGrid
              products={products}
              onEdit={handleOpenEdit}
              isAdmin={isAdminLoggedIn}
              onAddToCart={addToCart}
            />
          </>
        } />
        <Route path="/o-nas" element={<ONas />} />
        <Route path="/regulamin" element={<Regulamin />} />
        <Route path="/polityka-prywatnosci" element={<PolitykaPrywatnosci />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/dostawa" element={<Dostawa />} />
        <Route path="/metody-platnosci" element={<MetodyPlatnosci />} />
        <Route path="/zwroty-i-wymiany" element={<ZwrotyIWymiany />} />
        <Route path="/oferta" element={<ProductGrid products={products} onEdit={handleOpenEdit} isAdmin={isAdminLoggedIn} onAddToCart={addToCart} />} />
        <Route path="/prezenty" element={<PagePlaceholder title="Prezenty" />} />
        <Route path="/blog" element={<PagePlaceholder title="Nasz Blog" />} />
        <Route path="/oferta/:categoryPath" element={<CategoryView />} />
        <Route path="/produkt/:id" element={<ProductPage products={products} onAddToCart={addToCart} />} />
      </Routes>

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onAdd={handleAddProduct}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
        primaryColor={primaryColor}
        onUpdateColor={handleUpdateColor}
        orders={orders}
        onUpdateOrder={handleUpdateOrder}
        isLoggedIn={isAdminLoggedIn}
        onLogin={setIsAdminLoggedIn}
      />

      <EditPanel
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={productToEdit}
        onUpdate={handleUpdateProduct}
        onDelete={handleDeleteProduct}
      />

      <UserPanel
        isOpen={isUserOpen}
        onClose={() => setIsUserOpen(false)}
        user={loggedInUser}
        onLogin={setLoggedInUser}
      />

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemove={removeFromCart}
        total={cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0)}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default App;
