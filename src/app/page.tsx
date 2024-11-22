import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-black text-center">Welcome</CardTitle>
          <CardDescription className="text-center">
            Choose an option to proceed
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Link href="/chat" passHref>
            <Button className="w-full bg-[#2f27ce] hover:bg-[#2f27ce]/90">
              Chat with AI
            </Button>
          </Link>
          <Link href="/catalogue" passHref>
            <Button className="w-full bg-[#dedcff] text-black hover:bg-[#dedcff]/90">
              Buy Medicine
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
