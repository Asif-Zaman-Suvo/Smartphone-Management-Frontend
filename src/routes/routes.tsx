import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routesGenerator } from "../utils/routesGenerator";
import { allProductsPath } from "./allProducts.route";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { allSaleProducts } from "./allSaleProducts.route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routesGenerator(allProductsPath),
  },
  {
    path: "/",
    element: <App />,
    children: routesGenerator(allSaleProducts),
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
