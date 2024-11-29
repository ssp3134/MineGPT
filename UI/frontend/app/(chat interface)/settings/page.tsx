import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";
import Settings from "./components/settings";

const SettingsPage = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/");
  }
  return (
    <div className="h-full">
      <Settings currentUser={currentUser} />
    </div>
  );
};

export default SettingsPage;
