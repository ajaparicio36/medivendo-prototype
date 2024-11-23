import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-[#2f27ce]" />
        <p className="mt-4 text-lg font-semibold text-[#2f27ce]">Loading...</p>
      </div>
    </div>
  );
}
