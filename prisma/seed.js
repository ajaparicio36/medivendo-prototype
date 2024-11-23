/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const medicines = [
  {
    name: "Paracetamol",
    description: "Over-the-counter pain and fever reducer",
    image: "https://www.rosepharmacy.com/ph1/wp-content/uploads/2016/09/67195-800x931.jpg",
    price: 12.5,
    stock: 250,
    dosage: "500mg, take 1-2 tablets every 4-6 hours",
    sideEffects: "Rare side effects include skin rash, allergic reactions",
    manufactureDate: new Date("2024-01-15"),
    earliestExpiryDate: new Date("2026-01-15"),
    tags: ["pain reliever", "fever reducer", "headache", "otc", "acetaminophen", "pain", "fever", "bodyache"]
  },
  {
    name: "Ibuprofen",
    description: "Non-steroidal anti-inflammatory drug for pain relief",
    image: "https://assets.unilab.com.ph/uploads/Common/Products/Medicol-Advance-400/medicol-advance-400-product-shot.webp",
    price: 15.9,
    stock: 180,
    dosage: "400mg, take 1 tablet every 6-8 hours",
    sideEffects: "Potential stomach irritation, risk of ulcers",
    manufactureDate: new Date("2024-02-01"),
    earliestExpiryDate: new Date("2026-02-01"),
    tags: ["nsaid", "pain reliever", "anti-inflammatory", "muscle pain", "arthritis", "headache", "menstrual pain", "fever"]
  },
  {
    name: "Aspirin",
    description: "Pain reliever and blood thinner",
    image: "https://www.aspirin.ca/sites/g/files/vrxlpx30151/files/2021-06/Aspirin-Regular-extra-strength-100ct-carton.png",
    price: 10.9,
    stock: 300,
    dosage: "325mg, take 1 tablet daily",
    sideEffects: "Potential bleeding risk, stomach irritation",
    manufactureDate: new Date("2024-01-20"),
    earliestExpiryDate: new Date("2026-01-20"),
    tags: ["pain reliever", "blood thinner", "heart", "cardiovascular", "headache", "nsaid", "fever", "inflammation"]
  },
  {
    name: "Loratadine",
    description: "Non-drowsy antihistamine for allergy relief",
    image: "https://www.claritin.com.ph/sites/g/files/vrxlpx32636/files/2023-07/Claritin_Tablet_5sHeroFront.png",
    price: 18.5,
    stock: 220,
    dosage: "10mg, take 1 tablet daily",
    sideEffects: "Mild headache, dry mouth possible",
    manufactureDate: new Date("2024-03-01"),
    earliestExpiryDate: new Date("2026-03-01"),
    tags: ["allergy", "antihistamine", "non-drowsy", "hay fever", "rhinitis", "sneezing", "itching", "rash"]
  },
  {
    name: "Omeprazole",
    description: "Proton pump inhibitor for acid reflux treatment",
    image: "https://bttodss.shop/assets/images/products/thumbs/rm-omeprazole-20-mg-tab.jpg",
    price: 25.9,
    stock: 150,
    dosage: "20mg, take 1 tablet daily before meal",
    sideEffects: "Potential vitamin B12 deficiency, headaches",
    manufactureDate: new Date("2024-02-15"),
    earliestExpiryDate: new Date("2026-02-15"),
    tags: ["acid reflux", "heartburn", "gerd", "stomach acid", "indigestion", "gastric", "ulcer", "ppi"]
  },
  {
    name: "Diphenhydramine",
    description: "Antihistamine with sedative properties",
    image: "https://images.ctfassets.net/za5qny03n4xo/1eMhurqw0cnm90opZD7rUQ/b2ec4b89f1525c034d417d9756f3ec04/ah_side_0.png",
    price: 16.9,
    stock: 190,
    dosage: "50mg, take 1 tablet at bedtime",
    sideEffects: "Drowsiness, dry mouth, potential dizziness",
    manufactureDate: new Date("2024-01-10"),
    earliestExpiryDate: new Date("2026-01-10"),
    tags: ["allergy", "sleep aid", "antihistamine", "drowsy", "benadryl", "insomnia", "itching", "cold"]
  },
  {
    name: "Loperamide",
    description: "Anti-diarrheal medication",
    image: "https://medsgo.ph/images/detailed/35/Diatabs.png",
    price: 14.5,
    stock: 200,
    dosage: "2mg, take 1-2 capsules after each loose stool",
    sideEffects: "Constipation, abdominal pain",
    manufactureDate: new Date("2024-02-20"),
    earliestExpiryDate: new Date("2026-02-20"),
    tags: ["anti-diarrheal", "diarrhea", "stomach", "imodium", "gastric", "digestive", "bowel", "gut"]
  },
  {
    name: "Cetirizine",
    description: "Long-acting antihistamine for allergies",
    image: "https://southstardrug.com.ph/cdn/shop/products/45611.jpg?v=1706148652",
    price: 19.9,
    stock: 210,
    dosage: "10mg, take 1 tablet daily",
    sideEffects: "Mild drowsiness, dry mouth",
    manufactureDate: new Date("2024-03-10"),
    earliestExpiryDate: new Date("2026-03-10"),
    tags: ["allergy", "antihistamine", "hay fever", "rhinitis", "sneezing", "zyrtec", "itching", "rash"]
  },
  {
    name: "Vitamin C",
    description: "Essential vitamin for immune system support",
    image: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ndm/ndm01496/y/29.jpg",
    price: 22.9,
    stock: 280,
    dosage: "500mg, take 1 tablet daily",
    sideEffects: "Rare digestive issues at high doses",
    manufactureDate: new Date("2024-01-05"),
    earliestExpiryDate: new Date("2026-01-05"),
    tags: ["vitamin c", "immune system", "supplement", "ascorbic acid", "immunity", "vitamins", "antioxidant", "cold"]
  },
  {
    name: "Zinc Supplements",
    description: "Mineral supplement for immune health",
    image: "https://m.media-amazon.com/images/I/71PPuAK-auL.jpg",
    price: 20.5,
    stock: 170,
    dosage: "30mg, take 1 tablet daily",
    sideEffects: "Potential nausea, metallic taste",
    manufactureDate: new Date("2024-02-10"),
    earliestExpiryDate: new Date("2026-02-10"),
    tags: ["zinc", "mineral", "immune system", "supplement", "immunity", "minerals", "cold", "vitamins"]
  },
];

async function main() {
  console.log("Start seeding ...");
  for (const med of medicines) {
    await prisma.medicine.create({ data: med });
  }
  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });