import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/catalogue" passHref>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to catalogue</span>
              </Button>
            </Link>
            <h1 className="ml-4 text-xl font-semibold text-black">Checkout</h1>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
