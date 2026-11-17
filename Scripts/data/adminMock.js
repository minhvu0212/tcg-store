export const adminOverview = {
  totalRevenue: 3125800000,
  revenueGrowth: '+18.4% so với tháng trước',
  totalOrders: 1420,
  ordersGrowth: '+12.1% so với tháng trước',
  totalProducts: 135,
  activeCustomers: 890,
  lowStockCount: 4,
  chartData: [
    { month: 'T10', revenue: 380000000, orders: 180 },
    { month: 'T11', revenue: 460000000, orders: 210 },
    { month: 'T12', revenue: 740000000, orders: 340 },
    { month: 'T01', revenue: 535000000, orders: 245 },
    { month: 'T02', revenue: 495000000, orders: 220 },
    { month: 'T03', revenue: 515800000, orders: 225 }
  ]
};

export const adminOrders = [
  {
    id: 'ORD-7821',
    customer: 'Trần Văn Hải',
    email: 'hai.tran@tcgcollector.vn',
    date: '2026-03-16',
    itemsCount: 2,
    total: 28150000,
    status: 'Delivered',
    paymentMethod: 'Chuyển khoản Ngân hàng (Mô phỏng)',
    shippingAddress: '42 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',
    items: [
      { name: 'Umbreon VMAX Alternate Art (Moonbreon)', price: 24500000, quantity: 1 },
      { name: 'Charizard ex 151 Special Illustration Rare', price: 3650000, quantity: 1 }
    ]
  },
  {
    id: 'ORD-7820',
    customer: 'Nguyễn Thị Bích Ngọc',
    email: 'bichngoc.tcg@gmail.com',
    date: '2026-03-15',
    itemsCount: 4,
    total: 9235000,
    status: 'Shipped',
    paymentMethod: 'Ví MoMo (Mô phỏng)',
    shippingAddress: '104 Cầu Giấy, Hà Nội',
    items: [
      { name: 'Blue-Eyes White Dragon LOB-001 Ultra Rare', price: 8500000, quantity: 1 },
      { name: 'Dragon Shield Sleeves Matte Japanese Size', price: 320000, quantity: 2 },
      { name: 'Ultra PRO Magnetic One-Touch 35pt Case', price: 95000, quantity: 1 }
    ]
  },
  {
    id: 'ORD-7819',
    customer: 'Lê Minh Quân',
    email: 'quan.le@duelist.org',
    date: '2026-03-15',
    itemsCount: 1,
    total: 52000000,
    status: 'Processing',
    paymentMethod: 'Chuyển khoản Vietcombank (Mô phỏng)',
    shippingAddress: '88 Lê Lợi, Hải Châu, Đà Nẵng',
    items: [
      { name: 'Monkey D. Luffy Gear 5 Manga Alternate Art', price: 52000000, quantity: 1 }
    ]
  },
  {
    id: 'ORD-7818',
    customer: 'Phạm Tuấn Kiệt',
    email: 'kiet.pham@collection.com',
    date: '2026-03-14',
    itemsCount: 5,
    total: 2540000,
    status: 'Delivered',
    paymentMethod: 'Thẻ Quốc tế Visa/Master (Mô phỏng)',
    shippingAddress: '15 Trần Phú, Nha Trang, Khánh Hòa',
    items: [
      { name: 'Ash Blossom & Joyous Spring Ultra Rare', price: 750000, quantity: 2 },
      { name: 'Vault X Exo-Tec 9-Pocket Zip Binder', price: 850000, quantity: 1 },
      { name: 'Ultra PRO Magnetic One-Touch 35pt Case', price: 95000, quantity: 2 }
    ]
  },
  {
    id: 'ORD-7817',
    customer: 'Vũ Hoàng Nam',
    email: 'hoangnam.v@pokefan.net',
    date: '2026-03-13',
    itemsCount: 2,
    total: 5800000,
    status: 'Delivered',
    paymentMethod: 'ZaloPay (Mô phỏng)',
    shippingAddress: '230 Lê Văn Sỹ, Quận 3, TP. Hồ Chí Minh',
    items: [
      { name: 'Pokémon TCG: Scarlet & Violet - 151 Elite Trainer Box', price: 1650000, quantity: 1 },
      { name: 'Pokémon TCG: Scarlet & Violet - 151 Booster Box (JP)', price: 4150000, quantity: 1 }
    ]
  }
];

export const adminCustomers = [
  {
    id: 'CUST-001',
    name: 'Trần Văn Hải',
    email: 'hai.tran@tcgcollector.vn',
    phone: '0903 234 567',
    orders: 14,
    totalSpent: 122500000,
    tier: 'Platinum VIP',
    joinedDate: 'Tháng 1/2025'
  },
  {
    id: 'CUST-002',
    name: 'Lê Minh Quân',
    email: 'quan.le@duelist.org',
    phone: '0918 876 543',
    orders: 8,
    totalSpent: 156000000,
    tier: 'Diamond Grail Hunter',
    joinedDate: 'Tháng 3/2025'
  },
  {
    id: 'CUST-003',
    name: 'Nguyễn Thị Bích Ngọc',
    email: 'bichngoc.tcg@gmail.com',
    phone: '0988 345 678',
    orders: 6,
    totalSpent: 28500000,
    tier: 'Gold Collector',
    joinedDate: 'Tháng 8/2025'
  },
  {
    id: 'CUST-004',
    name: 'Vũ Hoàng Nam',
    email: 'hoangnam.v@pokefan.net',
    phone: '0977 987 654',
    orders: 11,
    totalSpent: 58400000,
    tier: 'Gold Collector',
    joinedDate: 'Tháng 11/2024'
  }
];
