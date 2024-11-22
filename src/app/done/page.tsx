"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function DonePage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-black">
            Thank You!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600">
            Your order has been successfully placed. We appreciate your
            business!
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleGoHome}>Go Back to Home</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
