import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import { TMainLayoutProps } from "./MainLayout";

const Sidebar = ({ userRole }: TMainLayoutProps) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <aside className="fixed inset-y-0 left-0 bg-gradient-to-tr from-pink-600 via-violet-600 to-yellow-600 shadow-md max-h-screen w-60">
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow">
          <div className="px-4 py-6 text-center border-b">
            <Link to="/" className="text-white text-md font-bold leading-none">
              Smartphone Management
            </Link>
          </div>
          <div className="p-4">
            <ul className="space-y-1 text-center">
              <Link to="/all-products">
                <li className="focus:outline-none text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  List All Products
                </li>
              </Link>
            </ul>
          </div>
          <div className="p-4">
            <ul className="space-y-1 text-center">
              <Link to="/sale-products">
                <li className="focus:outline-none text-white bg-black font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  All Sale Products List
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="p-4">
          <button
            onClick={handleClick}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Logout{" "}
              {userRole?.role === "superAdmin"
                ? "Super Admin"
                : userRole?.role === "manager"
                ? "Manager"
                : userRole?.role === "seller"
                ? "Seller"
                : ""}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
