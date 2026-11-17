import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  ShoppingBag, 
  Users, 
  AlertTriangle, 
  DollarSign, 
  ArrowUpRight, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Sparkles, 
  Layers, 
  Tag, 
  Settings as SettingsIcon,
  CheckCircle2,
  X,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import { getAssetUrl } from '../utils/assetHelper';
import { adminOverview, adminOrders, adminCustomers } from '../data/adminMock';
import { categories } from '../data/categories';

export default function AdminDashboard() {
  const { navigate, addToast } = useStore();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'customers' | 'inventory' | 'categories'
  const [searchFilter, setSearchFilter] = useState('');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [mockProducts, setMockProducts] = useState(products);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    productCode: '',
    tcgSeries: 'Pokémon TCG',
    category: 'Single Cards',
    price: 99.99,
    stock: 5,
    condition: 'Near Mint (NM)',
    rarity: 'Secret Rare'
  });

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    const created = {
      ...newProduct,
      id: `p-${Date.now()}`,
      image: newProduct.tcgSeries === 'Yu-Gi-Oh!' 
        ? getAssetUrl('/Images/yugioh/blue_eyes_white_dragon.jpg') 
        : getAssetUrl('/Images/pokemon/charizard_ex_151.png'),
      language: 'English',
      rating: 5.0,
      description: 'Newly added collector card to vault inventory.'
    };
    setMockProducts([created, ...mockProducts]);
    setIsAddProductModalOpen(false);
    addToast('Product Added', `Added "${created.name}" to inventory (Demo).`, 'gold');
  };

  const handleDeleteProduct = (id, name) => {
    setMockProducts(mockProducts.filter(p => p.id !== id));
    addToast('Product Deleted', `Removed "${name}" from mock catalog.`, 'info');
  };

  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.productCode.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.tcgSeries.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Notice Bar */}
      <div className="p-3.5 rounded-2xl bg-[#8957E5]/10 border border-[#8957E5]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#CBB2FE] gap-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-[#8957E5] flex-shrink-0" />
          <span>
            <strong>ADMIN VAULT PORTAL:</strong> Professional dark luxury management interface with live mock dataset.
          </span>
        </div>
        <button
          onClick={() => navigate('home')}
          className="text-white hover:text-[#D9B45B] font-bold text-xs underline cursor-pointer"
        >
          Return to Customer Storefront →
        </button>
      </div>

      {/* Admin Title & Navigation Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#282E40] pb-6">
        <div>
          <span className="text-xs font-bold text-[#D9B45B] uppercase tracking-wider">
            Control Center
          </span>
          <h1 className="text-3xl font-black text-white font-['Cinzel'] mt-1">
            TCG STORE MANAGEMENT CONSOLE
          </h1>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#111522] border border-[#282E40] rounded-2xl p-1.5">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#D9B45B] text-[#090B12] shadow-gold-glow'
                : 'text-[#9CA3B5] hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#D9B45B] text-[#090B12] shadow-gold-glow'
                : 'text-[#9CA3B5] hover:text-white'
            }`}
          >
            Products ({mockProducts.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#D9B45B] text-[#090B12] shadow-gold-glow'
                : 'text-[#9CA3B5] hover:text-white'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'customers'
                ? 'bg-[#D9B45B] text-[#090B12] shadow-gold-glow'
                : 'text-[#9CA3B5] hover:text-white'
            }`}
          >
            Customers
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#D9B45B] text-[#090B12] shadow-gold-glow'
                : 'text-[#9CA3B5] hover:text-white'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-[#D9B45B] text-[#090B12] shadow-gold-glow'
                : 'text-[#9CA3B5] hover:text-white'
            }`}
          >
            Categories
          </button>
        </div>
      </div>

      {/* ================= TAB 1: OVERVIEW ================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#9CA3B5]">
                <span className="font-semibold uppercase tracking-wider">Total Revenue (Demo)</span>
                <div className="p-2 rounded-xl bg-[#D9B45B]/10 text-[#D9B45B]">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                ${adminOverview.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center text-xs text-emerald-400 space-x-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{adminOverview.revenueGrowth}</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#9CA3B5]">
                <span className="font-semibold uppercase tracking-wider">Total Orders</span>
                <div className="p-2 rounded-xl bg-[#8957E5]/10 text-[#8957E5]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {adminOverview.totalOrders}
              </div>
              <div className="flex items-center text-xs text-emerald-400 space-x-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>{adminOverview.ordersGrowth}</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#9CA3B5]">
                <span className="font-semibold uppercase tracking-wider">Active Catalog Cards</span>
                <div className="p-2 rounded-xl bg-[#438DFF]/10 text-[#438DFF]">
                  <Package className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-white font-mono">
                {mockProducts.length}
              </div>
              <div className="text-xs text-[#9CA3B5]">
                Across 4 TCG Franchises
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-2">
              <div className="flex items-center justify-between text-xs text-[#9CA3B5]">
                <span className="font-semibold uppercase tracking-wider">Low Stock Grails</span>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono">
                {adminOverview.lowStockCount} Cards
              </div>
              <div className="text-xs text-[#9CA3B5]">
                Fewer than 3 copies in vault
              </div>
            </div>
          </div>

          {/* Revenue Simulation Chart & Top Selling */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Chart */}
            <div className="lg:col-span-8 p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-6">
              <div className="flex items-center justify-between border-b border-[#282E40] pb-4">
                <div>
                  <h3 className="font-bold text-sm text-white">Monthly Vault Revenue Simulation</h3>
                  <p className="text-xs text-[#9CA3B5]">6-Month trailing financial simulation overview</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#D9B45B]">+18.4% Average</span>
              </div>

              {/* Bar Graph Simulation */}
              <div className="h-60 flex items-end justify-between gap-4 pt-4 px-2">
                {adminOverview.chartData.map((d, i) => {
                  const heightPercent = (d.revenue / 32000) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="text-[10px] text-[#9CA3B5] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        ${(d.revenue / 1000).toFixed(1)}k
                      </div>
                      <div className="w-full bg-[#171C2B] rounded-xl overflow-hidden h-44 flex items-end p-1">
                        <div 
                          style={{ height: `${heightPercent}%` }}
                          className="w-full bg-gradient-to-t from-[#8957E5] to-[#D9B45B] rounded-lg group-hover:brightness-125 transition-all shadow-md"
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-[#9CA3B5] group-hover:text-white">
                        {d.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Selling Holy Grails */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
              <h3 className="font-bold text-sm text-white border-b border-[#282E40] pb-3">
                Top Performing Grails
              </h3>
              <div className="space-y-3">
                {products.filter(p => p.isBestSeller).slice(0, 4).map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-2 rounded-xl bg-[#171C2B] border border-[#282E40]/60 text-xs">
                    <div className="flex items-center space-x-2.5">
                      <img src={p.image} alt="" className="w-8 h-10 object-contain rounded bg-[#090B12]" />
                      <div>
                        <div className="font-bold text-white line-clamp-1">{p.name}</div>
                        <div className="text-[10px] text-[#D9B45B]">{p.rarity}</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-white">${p.price.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Recent Orders Table */}
          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
            <div className="flex items-center justify-between border-b border-[#282E40] pb-4">
              <h3 className="font-bold text-sm text-white">Recent Simulated Vault Orders</h3>
              <button onClick={() => setActiveTab('orders')} className="text-xs text-[#D9B45B] hover:underline font-bold">
                View All Orders →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-[#656D82] border-b border-[#282E40] uppercase tracking-wider text-[10px]">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Date</th>
                    <th className="pb-3 font-semibold">Items</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#282E40]/60">
                  {adminOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#171C2B]/50 transition-colors">
                      <td className="py-3 font-mono font-bold text-white">{ord.id}</td>
                      <td className="py-3 text-[#9CA3B5]">{ord.customer}</td>
                      <td className="py-3 text-[#656D82]">{ord.date}</td>
                      <td className="py-3 text-[#9CA3B5]">{ord.itemsCount} cards</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-white">
                        ${ord.total.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ================= TAB 2: PRODUCTS MANAGEMENT ================= */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search inventory by name, code, series..."
                className="w-72 bg-[#111522] border border-[#282E40] rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-[#656D82] focus:outline-none focus:border-[#D9B45B]"
              />
              <Search className="w-3.5 h-3.5 text-[#656D82] absolute left-3 top-2.5" />
            </div>

            <button
              onClick={() => setIsAddProductModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs hover:brightness-110 shadow-gold-glow flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Card (Demo)</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#656D82] border-b border-[#282E40] uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Card / Product</th>
                  <th className="pb-3 font-semibold">Code</th>
                  <th className="pb-3 font-semibold">Series</th>
                  <th className="pb-3 font-semibold">Rarity</th>
                  <th className="pb-3 font-semibold">Stock</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282E40]/60">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#171C2B]/50 transition-colors">
                    <td className="py-3 flex items-center space-x-3">
                      <img src={p.image} alt="" className="w-10 h-12 object-contain rounded bg-[#090B12] border border-[#282E40]" />
                      <div>
                        <div className="font-bold text-white">{p.name}</div>
                        <div className="text-[10px] text-[#9CA3B5]">{p.condition}</div>
                      </div>
                    </td>
                    <td className="py-3 font-mono text-[#D9B45B]">{p.productCode}</td>
                    <td className="py-3 text-white">{p.tcgSeries}</td>
                    <td className="py-3 text-[#9CA3B5] truncate max-w-[120px]">{p.rarity}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        p.stock < 3 
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="py-3 font-mono font-bold text-white">${p.price.toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => alert(`Edit Demo: You can edit ${p.name} in next release.`)}
                          className="p-1.5 rounded-lg bg-[#171C2B] text-[#9CA3B5] hover:text-white"
                          title="Edit Card"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1.5 rounded-lg bg-[#171C2B] text-[#656D82] hover:text-[#F43F5E]"
                          title="Delete Card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ================= TAB 3: ORDERS MANAGEMENT ================= */}
      {activeTab === 'orders' && (
        <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#282E40] pb-4">
            <div>
              <h3 className="font-bold text-sm text-white">All Simulated Collector Orders</h3>
              <p className="text-xs text-[#9CA3B5]">Dispatch orders with tracking simulation</p>
            </div>
            <span className="text-xs text-[#D9B45B] font-bold font-mono">5 Total Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#656D82] border-b border-[#282E40] uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Shipping Address</th>
                  <th className="pb-3 font-semibold">Payment</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282E40]/60">
                {adminOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#171C2B]/50 transition-colors">
                    <td className="py-3 font-mono font-bold text-white">{ord.id}</td>
                    <td className="py-3">
                      <div className="font-bold text-white">{ord.customer}</div>
                      <div className="text-[10px] text-[#9CA3B5]">{ord.email}</div>
                    </td>
                    <td className="py-3 text-[#9CA3B5] max-w-xs truncate">{ord.shippingAddress}</td>
                    <td className="py-3 text-white">{ord.paymentMethod}</td>
                    <td className="py-3">
                      <select 
                        defaultValue={ord.status}
                        onChange={(e) => addToast('Order Updated', `${ord.id} status changed to ${e.target.value}`, 'info')}
                        className="bg-[#171C2B] border border-[#282E40] rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="py-3 text-right font-mono font-bold text-white">
                      ${ord.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 4: CUSTOMERS MANAGEMENT ================= */}
      {activeTab === 'customers' && (
        <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#282E40] pb-4">
            <div>
              <h3 className="font-bold text-sm text-white">Registered Collector Members</h3>
              <p className="text-xs text-[#9CA3B5]">Collector tiers and total spend analytics</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[#656D82] border-b border-[#282E40] uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Collector</th>
                  <th className="pb-3 font-semibold">Tier</th>
                  <th className="pb-3 font-semibold">Orders</th>
                  <th className="pb-3 font-semibold">Total Spent</th>
                  <th className="pb-3 font-semibold">Joined</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#282E40]/60">
                {adminCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-[#171C2B]/50 transition-colors">
                    <td className="py-3">
                      <div className="font-bold text-white">{cust.name}</div>
                      <div className="text-[10px] text-[#9CA3B5]">{cust.email}</div>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D9B45B]/15 text-[#D9B45B] border border-[#D9B45B]/30">
                        {cust.tier}
                      </span>
                    </td>
                    <td className="py-3 text-white font-mono">{cust.orders} orders</td>
                    <td className="py-3 font-mono font-bold text-white">${cust.totalSpent.toFixed(2)}</td>
                    <td className="py-3 text-[#656D82]">{cust.joinedDate}</td>
                    <td className="py-3 text-right">
                      <button 
                        onClick={() => alert(`Customer Demo Profile: ${cust.name}`)}
                        className="text-xs font-bold text-[#D9B45B] hover:underline"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 5: INVENTORY MANAGEMENT ================= */}
      {activeTab === 'inventory' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-[#282E40] pb-3">
              Low Stock Warnings (&lt; 3 Units Remaining)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mockProducts.filter(p => p.stock <= 3).map(p => (
                <div key={p.id} className="p-4 rounded-2xl bg-[#171C2B] border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={p.image} alt="" className="w-10 h-14 object-contain rounded bg-[#090B12]" />
                    <div>
                      <div className="font-bold text-white text-xs">{p.name}</div>
                      <div className="text-[10px] text-[#D9B45B] font-mono">{p.productCode}</div>
                      <div className="text-[10px] text-amber-400 font-bold mt-1">Only {p.stock} left in vault</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      p.stock += 5;
                      setMockProducts([...mockProducts]);
                      addToast('Restocked', `Restocked 5 units for ${p.name}`, 'gold');
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-[#282E40] hover:bg-[#D9B45B] hover:text-[#090B12] text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    +5 Reorder
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 6: CATEGORIES MANAGEMENT ================= */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
          {categories.map((cat) => (
            <div key={cat.id} className="p-6 rounded-3xl bg-[#111522] border border-[#282E40] space-y-4">
              <div className="flex items-center space-x-3">
                <img src={cat.image} alt="" className="w-12 h-16 object-contain rounded-xl bg-[#090B12] border border-[#282E40] p-1" />
                <div>
                  <h3 className="font-bold text-white text-sm">{cat.name}</h3>
                  <div className="text-xs text-[#D9B45B] font-semibold">{cat.tagline}</div>
                </div>
              </div>
              <p className="text-xs text-[#9CA3B5] leading-relaxed">{cat.description}</p>
              <div className="space-y-1.5 pt-2 border-t border-[#282E40]">
                <div className="text-[10px] text-[#656D82] uppercase font-bold">Subcategories:</div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.subcategories.map((sub, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[#171C2B] border border-[#282E40] text-[11px] text-white">
                      {sub.name} ({sub.count})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal (Demo) */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-lg bg-[#111522] border border-[#282E40] rounded-3xl p-6 sm:p-8 space-y-6 text-[#F5F5F7]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#282E40] pb-3">
              <h3 className="font-bold text-base text-white">Add New Card to Catalog (Demo)</h3>
              <button onClick={() => setIsAddProductModalOpen(false)} className="text-[#9CA3B5] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[#9CA3B5] font-semibold">Card Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stardust Dragon Ghost Rare"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D9B45B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#9CA3B5] font-semibold">Product Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TDGS-EN040"
                    value={newProduct.productCode}
                    onChange={(e) => setNewProduct({ ...newProduct, productCode: e.target.value })}
                    className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D9B45B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#9CA3B5] font-semibold">TCG Franchise</label>
                  <select
                    value={newProduct.tcgSeries}
                    onChange={(e) => setNewProduct({ ...newProduct, tcgSeries: e.target.value })}
                    className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Pokémon TCG">Pokémon TCG</option>
                    <option value="Yu-Gi-Oh!">Yu-Gi-Oh!</option>
                    <option value="One Piece">One Piece</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#9CA3B5] font-semibold">Demo Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D9B45B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#9CA3B5] font-semibold">Initial Stock</label>
                  <input
                    type="number"
                    required
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#171C2B] border border-[#282E40] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D9B45B]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D9B45B] to-[#B3913E] text-[#090B12] font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-glow transition-all cursor-pointer"
              >
                Save Card to Catalog
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
