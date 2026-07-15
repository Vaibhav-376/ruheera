const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({});

async function main() {
  console.log('Starting seed...');

  // Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ruheera.com' },
    update: {},
    create: {
      email: 'admin@ruheera.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user created:', admin.email);

  // Dummy Images
  const placeholderImages = [
    'https://images.unsplash.com/photo-1599643478524-fb66f70a0066?q=80&w=600&auto=format&fit=crop', // Necklace
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop', // Ring
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop', // Earrings
  ];

  // Create Products
  const products = [
    {
      name: 'Aurelia Gold Necklace',
      description: 'A stunning 18k solid gold necklace featuring a classic pendant. Perfect for evening wear and special occasions.',
      price: 45000,
      weight: 15.5,
      images: [placeholderImages[0], placeholderImages[1]],
    },
    {
      name: 'Solitaire Diamond Ring',
      description: 'An elegant platinum band showcasing a brilliant-cut 1-carat diamond. A timeless symbol of love.',
      price: 120000,
      weight: 4.2,
      images: [placeholderImages[1]],
    },
    {
      name: 'Pearl Drop Earrings',
      description: 'Classic freshwater pearls set in 14k rose gold. Delicate and sophisticated for everyday elegance.',
      price: 18500,
      weight: 6.8,
      images: [placeholderImages[2]],
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: p,
    });
    console.log(`Created product: ${p.name}`);
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
