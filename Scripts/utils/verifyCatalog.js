import fs from 'fs';
import path from 'path';

// Read raw products from products.js
const content = fs.readFileSync('Scripts/data/products.js', 'utf8');
const match = content.match(/const rawProducts = (\[[\s\S]*?\]);\s*export const products/);

if (!match) {
  console.error('Failed to parse rawProducts from products.js');
  process.exit(1);
}

const products = JSON.parse(match[1]);

console.log('=== TCG STORE / TCG ARENA CATALOG AUDIT REPORT ===');
console.log(`Total Products: ${products.length}`);

// By Series
const bySeries = {};
products.forEach(p => {
  bySeries[p.tcgSeries] = (bySeries[p.tcgSeries] || 0) + 1;
});
console.log('\n--- Products by TCG Series ---');
for (const [k, v] of Object.entries(bySeries)) {
  console.log(`  ${k}: ${v} products`);
}

// By Category / Type
const byCategory = {};
products.forEach(p => {
  byCategory[p.category] = (byCategory[p.category] || 0) + 1;
});
console.log('\n--- Products by Category / Product Type ---');
for (const [k, v] of Object.entries(byCategory)) {
  console.log(`  ${k}: ${v} products`);
}

// By Price Segment
let budgetCount = 0; // < 100k
let midCount = 0;    // 100k - 500k
let highCount = 0;   // 500k - 2m
let grailCount = 0;  // > 2m

products.forEach(p => {
  if (p.price < 100000) budgetCount++;
  else if (p.price <= 500000) midCount++;
  else if (p.price <= 2000000) highCount++;
  else grailCount++;
});

console.log('\n--- Products by Price Segments ---');
console.log(`  Budget (< 100.000 ₫): ${budgetCount} products`);
console.log(`  Mid-Tier (100.000 ₫ – 500.000 ₫): ${midCount} products`);
console.log(`  Collector Tier (500.000 ₫ – 2.000.000 ₫): ${highCount} products`);
console.log(`  High Value / Holy Grails (> 2.000.000 ₫): ${grailCount} products`);

// Image check
let missingImages = 0;
products.forEach(p => {
  let imgPath = p.image;
  if (imgPath.startsWith('/')) imgPath = imgPath.slice(1);
  if (!fs.existsSync(imgPath)) {
    console.warn(`  Missing image for ${p.id} (${p.name}): ${p.image}`);
    missingImages++;
  }
});
console.log(`\nImage Integrity: ${missingImages === 0 ? '✓ ALL 135 images exist on disk' : `✗ ${missingImages} missing images`}`);

// Price validity check
let invalidPrices = 0;
products.forEach(p => {
  if (typeof p.price !== 'number' || isNaN(p.price) || p.price <= 0) {
    console.warn(`  Invalid price for ${p.id}: ${p.price}`);
    invalidPrices++;
  }
});
console.log(`Price Integrity: ${invalidPrices === 0 ? '✓ ALL 135 prices are valid positive numbers' : `✗ ${invalidPrices} invalid prices`}`);
