import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MedicineCardProps {
  medicine: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
}

export function MedicineCard({ medicine }: MedicineCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
          <h2 className="font-semibold text-black mb-1">{medicine.name}</h2>
          <p className="text-sm text-gray-600 mb-2">{medicine.description}</p>
          <p className="text-[#2f27ce] font-semibold mb-2">
            PHP {medicine.price.toFixed(2)}
          </p>
          <Link href={`/medicines/${medicine.id}`} passHref>
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
