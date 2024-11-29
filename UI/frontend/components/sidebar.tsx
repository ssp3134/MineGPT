"use client";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  History,
  LogOut,
  MessageSquare,
  PlusCircle,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { User } from "@prisma/client";

interface sidebarProps {
  currentUser?: User;
}

const routes = [
  {
    href: "/chat/1",
    label: "title1",
  },
  {
    href: "/chat/2",
    label: "title2",
  },
  {
    href: "/chat/3",
    label: "title3 akdjfklsjflkkjdsflkakjflkjasdlkfjalkkfdjlk",
  },
];

const Sidebar: React.FC<sidebarProps> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [hidden, setHidden] = useState(true);

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-primary text-secondary items-center">
      <div className="px-3 py-2 flex flex-col h-full">
        <div>
          <Link href="/chat" className="flex items-center pl-3 mb-14">
            <div className="relative w-8 h-8 mr-4">
              <Image fill alt="Logo" src="/logo.png" />
            </div>
            <h1 className="text-2xl font-bold">Mine-GPT</h1>
          </Link>
        </div>
        <div>
          <div className="flex items-center pl-3 mb-4">
            Hello {currentUser?.name}!
          </div>
        </div>
        <div className="space-y-1 flex-grow">
          <div className="flex flex-col justify-between h-full">
            <div className="">
              <div>
                <Link
                  href="/chat"
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start items-center font-medium cursor-pointer hover:text-muted hover:bg-muted-foreground/5 rounded-lg transition",
                    pathname == "/chat"
                      ? "text-secondary"
                      : "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center flex-1">
                    <PlusCircle className="h-5 w-5 mr-3" />
                    Start New Conversation
                  </div>
                </Link>
              </div>
              <div>
                <div
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start items-center font-medium cursor-pointer hover:text-muted hover:bg-muted-foreground/5 rounded-lg transition",
                    pathname?.slice(0, 5) == "/chat"
                      ? "text-secondary"
                      : "text-muted-foreground"
                  )}
                  onClick={() => {
                    hidden ? setHidden(false) : setHidden(true);
                  }}
                >
                  <div className="flex items-center flex-1">
                    <History className="h-5 w-5 mr-3" />
                    Past Conversations
                  </div>
                </div>
                <div hidden={hidden} className="md:ps-7">
                  {routes.map((route) => (
                    <div key={route.href}>
                      <Link
                        href={route.href}
                        className={cn(
                          "text-sm group flex p-3 w-full justify-start items-center font-medium cursor-pointer hover:text-muted hover:bg-muted-foreground/5 rounded-lg transition",
                          pathname == route.href
                            ? "text-secondary"
                            : "text-muted-foreground"
                        )}
                      >
                        <div className="flex items-center flex-1">
                          <MessageSquare className="h-5 w-5 mr-3" />
                          <p className="truncate text-ellipsis w-36">
                            {route.label}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-auto">
              <div>
                <Link
                  href="/settings"
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start items-center font-medium cursor-pointer hover:text-muted hover:bg-muted-foreground/5 rounded-lg transition",
                    pathname == "/settings"
                      ? "text-secondary"
                      : "text-muted-foreground"
                  )}
                >
                  <div className="flex items-center flex-1">
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </div>
                </Link>
              </div>
              <div>
                <div
                  className="text-sm group flex p-3 w-full justify-start items-center font-medium cursor-pointer text-muted-foreground hover:text-muted hover:bg-muted-foreground/5 rounded-lg transition"
                  onClick={() =>
                    signOut({ redirect: false }).then(() => {
                      toast.success("Successfully Logged Out !");
                      router.push("/");
                    })
                  }
                >
                  <div className="flex items-center flex-1">
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
