"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChatBox } from "@/components/ChatBox";
import { Medicine } from "@prisma/client";
import debounce from "lodash/debounce";

interface SearchBarProps {
  onSearchResults: (results: Medicine[]) => void;
}

export function SearchBar({ onSearchResults }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim() === "") {
        const response = await fetch("/api/medicines");
        const allMedicines = await response.json();
        onSearchResults(allMedicines);
      } else {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(query)}`
        );
        const results = await response.json();
        onSearchResults(results);
      }
    }, 300),
    [onSearchResults]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  const handleAIResponse = async (tags: string[]) => {
    setSearchQuery(tags.join(" "));
  };

  return (
    <div className="flex w-full max-w-3xl items-center space-x-2">
      <Input
        type="text"
        placeholder="Search medicines (e.g., 'ibu ace' for Ibuprofen and Acetaminophen)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow text-lg py-6"
      />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-14 px-4 text-lg">
            <MessageSquare className="mr-2 h-5 w-5" /> Ask AI
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ChatBox
            initialMessage="What symptoms are you feeling?"
            suggestions={["Headache", "Cough", "Clogged sinuses"]}
            onAIResponse={handleAIResponse}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
