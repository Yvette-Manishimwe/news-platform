const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt"); // ✅ Correct import

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const categories = [
    { name: "Politics", description: "News about politics and government" },
    { name: "Technology", description: "Latest tech news and innovations" },
    { name: "Sports", description: "Sports news and updates" },
    { name: "Business", description: "Business and financial news" },
    { name: "Entertainment", description: "Entertainment and celebrity news" },
    { name: "Health", description: "Health and wellness news" },
    { name: "Science", description: "Scientific discoveries and research" },
    { name: "Lifestyle", description: "Lifestyle, fashion, and culture" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      nationalId: "ADMIN123456",
      role: "admin",
    },
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
