import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CartItem {
  id: number;
  medicineId: number;
  medicine: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface CartPopoverProps {
  cart: CartItem[];
  onRemoveFromCart: (itemId: number) => void;
  onProceedToCheckout: () => void;
}

export function CartPopover({
  cart,
  onRemoveFromCart,
  onProceedToCheckout,
}: CartPopoverProps) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
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
                      {item.medicine.name} x {item.quantity}
                    </span>
                    <div className="flex items-center">
                      <span className="mr-2">
                        PHP {(item.medicine.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveFromCart(item.id)}
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
                      (sum, item) => sum + item.medicine.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <Button onClick={onProceedToCheckout} className="w-full">
                Proceed to Checkout
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
