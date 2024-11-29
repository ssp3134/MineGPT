import { User } from "@prisma/client";
import MobileSidebar from "./mobile-sidebar";

interface navbarProps {
  currentUser?: User;
}

const Navbar: React.FC<navbarProps> = ({ currentUser }) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar currentUser={currentUser} />
    </div>
  );
};

export default Navbar;
