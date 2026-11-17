export const adminOverview = {
  totalRevenue: 124850.00,
  revenueGrowth: '+18.4% from last month',
  totalOrders: 1420,
  ordersGrowth: '+12.1% from last month',
  totalProducts: 48,
  activeCustomers: 890,
  lowStockCount: 4,
  chartData: [
    { month: 'Oct', revenue: 14200, orders: 180 },
    { month: 'Nov', revenue: 18400, orders: 210 },
    { month: 'Dec', revenue: 29800, orders: 340 },
    { month: 'Jan', revenue: 21500, orders: 245 },
    { month: 'Feb', revenue: 19800, orders: 220 },
    { month: 'Mar', revenue: 21150, orders: 225 }
  ]
};

export const adminOrders = [
  {
    id: 'ORD-7821',
    customer: 'David Miller',
    email: 'david.m@tcgcollector.io',
    date: '2026-03-16',
    itemsCount: 2,
    total: 984.00,
    status: 'Delivered',
    paymentMethod: 'Credit Card (Demo)',
    shippingAddress: '742 Evergreen Terrace, Springfield, OR',
    items: [
      { name: 'Umbreon VMAX Alternate Art', price: 799.00, quantity: 1 },
      { name: 'Charizard ex 151 SIR', price: 185.00, quantity: 1 }
    ]
  },
  {
    id: 'ORD-7820',
    customer: 'Sarah Jenkins',
    email: 'sarah.j@gamermail.com',
    date: '2026-03-15',
    itemsCount: 3,
    total: 398.97,
    status: 'Shipped',
    paymentMethod: 'PayPal (Demo)',
    shippingAddress: '104 Main Street, Austin, TX',
    items: [
      { name: 'Blue-Eyes White Dragon LOB-001', price: 349.99, quantity: 1 },
      { name: 'Dragon Shield Sleeves Matte', price: 13.99, quantity: 2 },
      { name: 'Ultra PRO Magnetic One-Touch', price: 18.99, quantity: 1 }
    ]
  },
  {
    id: 'ORD-7819',
    customer: 'Michael Chang',
    email: 'm.chang@duelist.org',
    date: '2026-03-15',
    itemsCount: 1,
    total: 2450.00,
    status: 'Processing',
    paymentMethod: 'Crypto / Bank (Demo)',
    shippingAddress: '55 Ocean Avenue, San Francisco, CA',
    items: [
      { name: 'Monkey D. Luffy Gear 5 Manga Secret Rare', price: 2450.00, quantity: 1 }
    ]
  },
  {
    id: 'ORD-7818',
    customer: 'Liam Henderson',
    email: 'liam.h@collection.com',
    date: '2026-03-14',
    itemsCount: 4,
    total: 136.96,
    status: 'Delivered',
    paymentMethod: 'Apple Pay (Demo)',
    shippingAddress: '88 Baker St, London, UK',
    items: [
      { name: 'Ash Blossom & Joyous Spring', price: 32.50, quantity: 2 },
      { name: 'Vault X Zip Binder', price: 34.99, quantity: 1 },
      { name: 'Ultra PRO 35pt Magnetic Case', price: 18.99, quantity: 2 }
    ]
  },
  {
    id: 'ORD-7817',
    customer: 'Emily Watson',
    email: 'emily.w@pokefan.net',
    date: '2026-03-13',
    itemsCount: 2,
    total: 244.98,
    status: 'Delivered',
    paymentMethod: 'Google Pay (Demo)',
    shippingAddress: '42 Pine Crest, Seattle, WA',
    items: [
      { name: 'Pokemon 151 Elite Trainer Box', price: 69.99, quantity: 1 },
      { name: 'Pokemon 151 Booster Box', price: 174.99, quantity: 1 }
    ]
  }
];

export const adminCustomers = [
  {
    id: 'CUST-001',
    name: 'David Miller',
    email: 'david.m@tcgcollector.io',
    phone: '+1 (555) 234-5678',
    orders: 14,
    totalSpent: 4890.50,
    tier: 'Platinum VIP',
    joinedDate: 'Jan 2025'
  },
  {
    id: 'CUST-002',
    name: 'Michael Chang',
    email: 'm.chang@duelist.org',
    phone: '+1 (555) 876-5432',
    orders: 8,
    totalSpent: 6250.00,
    tier: 'Diamond Grail Hunter',
    joinedDate: 'Mar 2025'
  },
  {
    id: 'CUST-003',
    name: 'Sarah Jenkins',
    email: 'sarah.j@gamermail.com',
    phone: '+1 (555) 345-6789',
    orders: 6,
    totalSpent: 1120.00,
    tier: 'Gold Collector',
    joinedDate: 'Aug 2025'
  },
  {
    id: 'CUST-004',
    name: 'Emily Watson',
    email: 'emily.w@pokefan.net',
    phone: '+1 (555) 987-6543',
    orders: 11,
    totalSpent: 2340.00,
    tier: 'Gold Collector',
    joinedDate: 'Nov 2024'
  }
];
