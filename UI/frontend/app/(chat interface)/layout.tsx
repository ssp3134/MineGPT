import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import getCurrentUser from "../actions/getCurrentUser";
import { redirect } from "next/navigation";

const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/");
  }
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:fixed md:inset-y-0 z-[80] bg-primary text-secondary">
        <Sidebar currentUser={currentUser} />
      </div>
      <main className="md:pl-72 h-full">
        <Navbar currentUser={currentUser} />
        {children}
      </main>
    </div>
  );
};

export default ChatLayout;
