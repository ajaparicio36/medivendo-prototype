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
      <Card className="w-[450px]">
        <CardHeader className="space-y-2">
          <CardTitle className="text-black text-center text-3xl">
            Welcome
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Choose an option to proceed
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-6 p-6">
          <Link href="/chat" passHref>
            <Button className="w-full bg-[#2f27ce] hover:bg-[#2f27ce]/90 text-lg py-6">
              Chat with AI
            </Button>
          </Link>
          <Link href="/catalogue" passHref>
            <Button className="w-full bg-[#dedcff] text-black hover:bg-[#dedcff]/90 text-lg py-6">
              Buy Medicine
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
