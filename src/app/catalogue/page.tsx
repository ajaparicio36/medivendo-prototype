"use client";

import { useState, useEffect } from "react";
import { MedicineCard } from "@/components/MedicineCard";
import { Medicine } from "@prisma/client";
import { SearchBar } from "@/components/SearchBar";
import Loading from "@/components/Loading";

export default function Catalogue() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialMedicines = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/medicines");
        if (!response.ok) {
          throw new Error("Failed to fetch medicines");
        }
        const data = await response.json();
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialMedicines();
  }, []);

  const handleSearchResults = (results: Medicine[]) => {
    setMedicines(results);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-black mb-6">
        Available Medicines
      </h1>
      <div className="mb-6">
        <SearchBar onSearchResults={handleSearchResults} />
      </div>
      {medicines.length === 0 ? (
        <p className="text-center text-gray-500">No medicines found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>
      )}
    </div>
  );
}
