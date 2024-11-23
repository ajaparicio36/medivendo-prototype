"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AddToCartDialog } from "@/components/AddToCartDialog";
import { Medicine } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Loading from "@/components/Loading";

export default function MedicinePage() {
  const { id } = useParams();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMedicine = async () => {
      const response = await fetch(`/api/medicines/${id}`);
      const data = await response.json();
      setMedicine(data);
      setIsLoading(false);
    };

    fetchMedicine();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  const handleAddToCart = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmAddToCart = async (quantity: number) => {
    if (medicine) {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medicineId: medicine.id,
          quantity,
        }),
      });

      setIsDialogOpen(false);
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  if (!medicine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      <div className="relative border border-gray-200 rounded-lg p-8 w-full max-w-4xl shadow-lg">
        <Link href="/catalogue" passHref>
          <Button variant="ghost" className="absolute top-4 left-4 p-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="aspect-square relative">
            <Image
              src={medicine.image}
              alt={medicine.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{medicine.name}</h1>
            <p className="text-xl text-[#2f27ce] font-semibold mb-4">
              PHP {medicine.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-4">{medicine.description}</p>
            <div className="space-y-2">
              <p>
                <strong>Dosage:</strong> {medicine.dosage}
              </p>
              <p>
                <strong>Side Effects:</strong> {medicine.sideEffects}
              </p>
              <p>
                <strong>Manufacture Date:</strong>{" "}
                {new Date(medicine.manufactureDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Expiry Date:</strong>{" "}
                {new Date(medicine.earliestExpiryDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Stock:</strong> {medicine.stock} units
              </p>
            </div>
            <div className="mt-6">
              <Button onClick={handleAddToCart} className="w-full">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AddToCartDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmAddToCart}
      />
    </div>
  );
}
