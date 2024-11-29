import { redirect } from "next/navigation";
import getCurrentUser from "../actions/getCurrentUser";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/chat");
  }

  return (
    <div className="h-full flex items-center justify-center">
      <div>{children}</div>
    </div>
  );
};

export default AuthLayout;
