import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { TUser } from "../../redux/features/auth/authSlice";

export type TMainLayoutProps = {
  userRole: TUser | null;
};
const MainLayout = ({ userRole }: TMainLayoutProps) => {
  return (
    <>
      <body className="relative  overflow-hidden max-h-screen">
        <Sidebar userRole={userRole} />
        <main className="ml-60 pt-16 max-h-screen overflow-auto">
          <div className="px-6 py-8">
            <Outlet />
          </div>
        </main>
      </body>
    </>
  );
};

export default MainLayout;
