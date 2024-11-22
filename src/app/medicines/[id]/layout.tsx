"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartPopover } from "@/components/CartPopover";
import Image from "next/image";

interface CartItem {
  id: number;
  medicineId: number;
  medicine: {
    name: string;
    price: number;
  };
  quantity: number;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("/api/cart");
      const data = await response.json();
      setCart(data);
    };

    fetchCart();
    window.addEventListener("cartUpdated", fetchCart);

    return () => {
      window.removeEventListener("cartUpdated", fetchCart);
    };
  }, []);

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  const handleRemoveFromCart = async (itemId: number) => {
    await fetch(`/api/cart/${itemId}`, {
      method: "DELETE",
    });

    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="MediVendo Logo"
                width={150}
                height={40}
                priority
              />
            </Link>
            <CartPopover
              cart={cart}
              onRemoveFromCart={handleRemoveFromCart}
              onProceedToCheckout={handleProceedToCheckout}
            />
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
