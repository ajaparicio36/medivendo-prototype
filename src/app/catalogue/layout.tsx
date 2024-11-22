"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CatalogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      setCart(updatedCart);
    };

    handleStorageChange(); // Initial load
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("cartUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleStorageChange);
    };
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  const handleRemoveFromCart = (itemId: number) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-semibold text-black">
              MediShop
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#2f27ce] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                  <span className="sr-only">Shopping cart</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <h3 className="font-medium leading-none">Your Cart</h3>
                  {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                  ) : (
                    <>
                      <ul className="space-y-2">
                        {cart.map((item) => (
                          <li
                            key={item.id}
                            className="flex justify-between items-center"
                          >
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <div className="flex items-center">
                              <span className="mr-2">
                                PHP {(item.price * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="h-6 w-6 p-0"
                              >
                                <span className="sr-only">Remove item</span>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="flex justify-between items-center font-bold">
                        <span>Total:</span>
                        <span>
                          PHP{" "}
                          {cart
                            .reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0
                            )
                            .toFixed(2)}
                        </span>
                      </div>
                      <Button
                        onClick={handleProceedToCheckout}
                        className="w-full"
                      >
                        Proceed to Checkout
                      </Button>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
