import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex items-center text-center md:text-start">
      <div className="container">
        <div className="my-6">
          <h1 className="text-3xl font-bold my-3">Welcome, ask me anything about Mining.</h1>
          <p className="flex-wrap">
            One stop solution to get your queries pertaining to various Acts,
            Rules, and Regulations applicable to Mining industries cleared
          </p>
        </div>
        <Separator />
        <div className="my-6">
          <div className="text-xl font-bold">Let&apos;s get started</div>
          <div>
            <Link href={"/sign-in"}>
              <Button className="my-3 me-3">Sign In</Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button className="my-3 me-3">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
