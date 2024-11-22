"use client";

import { useState, useEffect } from "react";
import { MedicineCard } from "@/components/MedicineCard";
import { Medicine } from "@prisma/client";

export default function Catalogue() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      const response = await fetch("/api/medicines");
      const data = await response.json();
      setMedicines(data);
    };

    fetchMedicines();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-black mb-6">
        Available Medicines
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} />
        ))}
      </div>
    </div>
  );
}
