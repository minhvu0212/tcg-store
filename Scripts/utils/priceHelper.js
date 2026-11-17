/**
 * Helper to format price in Vietnamese Đồng (VNĐ)
 * Example: 250000 -> "250.000 ₫"
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '0';
  return new Intl.NumberFormat('vi-VN').format(amount);
}
