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

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const router = useRouter();

  useEffect(() => {
    const cartItems: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCart(cartItems);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // In a real application, you would process the payment here
    alert(`Checkout completed with ${paymentMethod} payment method`);
    localStorage.removeItem("cart");
    router.push("/");
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
                  {item.name} x {item.quantity}
                </span>
                <span>PHP {(item.price * item.quantity).toFixed(2)}</span>
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
