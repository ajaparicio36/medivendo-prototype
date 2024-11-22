"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Medicine {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Medicine {
  quantity: number;
}

// Sample data for common OTC medicines
const medicines: Medicine[] = [
  {
    id: 1,
    name: "Paracetamol",
    price: 12.5,
    image:
      "https://www.rosepharmacy.com/ph1/wp-content/uploads/2016/09/67195-800x931.jpg",
    description: "Pain and fever relief",
  },
  {
    id: 2,
    name: "Ibuprofen",
    price: 15.9,
    image:
      "https://assets.unilab.com.ph/uploads/Common/Products/Medicol-Advance-400/medicol-advance-400-product-shot.webp",
    description: "Anti-inflammatory pain relief",
  },
  {
    id: 3,
    name: "Aspirin",
    price: 10.9,
    image:
      "https://www.aspirin.ca/sites/g/files/vrxlpx30151/files/2021-06/Aspirin-Regular-extra-strength-100ct-carton.png",
    description: "Pain relief and blood thinner",
  },
  {
    id: 4,
    name: "Loratadine",
    price: 18.5,
    image:
      "https://www.claritin.com.ph/sites/g/files/vrxlpx32636/files/2023-07/Claritin_Tablet_5sHeroFront.png",
    description: "Antihistamine for allergies",
  },
  {
    id: 5,
    name: "Omeprazole",
    price: 25.9,
    image:
      "https://bttodss.shop/assets/images/products/thumbs/rm-omeprazole-20-mg-tab.jpg",
    description: "Acid reflux treatment",
  },
  {
    id: 6,
    name: "Diphenhydramine",
    price: 16.9,
    image:
      "https://images.ctfassets.net/za5qny03n4xo/1eMhurqw0cnm90opZD7rUQ/b2ec4b89f1525c034d417d9756f3ec04/ah_side_0.png",
    description: "Sleep aid and allergy relief",
  },
  {
    id: 7,
    name: "Loperamide",
    price: 14.5,
    image: "https://medsgo.ph/images/detailed/35/Diatabs.png",
    description: "Anti-diarrheal medication",
  },
  {
    id: 8,
    name: "Cetirizine",
    price: 19.9,
    image:
      "https://southstardrug.com.ph/cdn/shop/products/45611.jpg?v=1706148652",
    description: "24-hour allergy relief",
  },
  {
    id: 9,
    name: "Vitamin C",
    price: 22.9,
    image:
      "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ndm/ndm01496/y/29.jpg",
    description: "Immune system support",
  },
  {
    id: 10,
    name: "Zinc Supplements",
    price: 20.5,
    image: "https://m.media-amazon.com/images/I/71PPuAK-auL.jpg",
    description: "Mineral supplement",
  },
];

export default function Catalogue() {
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddToCart = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setIsDialogOpen(true);
  };

  const handleConfirmAddToCart = () => {
    if (selectedMedicine) {
      const cartItem: CartItem = { ...selectedMedicine, quantity };
      const existingCart: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const updatedCart = [...existingCart, cartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setIsDialogOpen(false);
      setQuantity(1);
      // Trigger a custom event to notify the layout about the cart update
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-black mb-6">
        Available Medicines
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((medicine) => (
          <Card
            key={medicine.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <Image
                  src={medicine.image}
                  alt={medicine.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-black mb-1">
                  {medicine.name}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  {medicine.description}
                </p>
                <p className="text-[#2f27ce] font-semibold mb-2">
                  PHP {medicine.price.toFixed(2)}
                </p>
                <Button
                  onClick={() => handleAddToCart(medicine)}
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add to Cart</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="col-span-3"
                min="1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleConfirmAddToCart}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
