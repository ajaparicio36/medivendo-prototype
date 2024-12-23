"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";

interface CartItem {
  id: number;
  medicineId: number;
  medicine: {
    name: string;
    price: number;
  };
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("/api/cart");
      const data = await response.json();
      setCart(data);
      setIsLoading(false);
    };

    fetchCart();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.medicine.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    // Clear the cart in the database
    await fetch("/api/cart", {
      method: "DELETE",
    });

    // Trigger cart update event
    window.dispatchEvent(new Event("cartUpdated"));

    // Redirect to the done page
    router.push("/done");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span>
                  {item.medicine.name} x {item.quantity}
                </span>
                <span>
                  PHP {(item.medicine.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total:</span>
              <span>PHP {total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gcash" id="gcash" />
                <Label htmlFor="gcash">GCash QR</Label>
              </div>
            </RadioGroup>
          </div>
          {paymentMethod === "gcash" && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">GCash QR Code</h3>
              <div className="bg-white p-4 inline-block">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="GCash QR Code"
                  width={200}
                  height={200}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleCheckout} className="w-full">
            Complete Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
