import AllProducts from "../pages/AllProducts";
import DuplicateProduct from "../pages/DuplicateProduct";
import EditProduct from "../pages/EditProduct";

export const allProductsPath = [
  {
    name: "All Products",
    path: "all-Products",
    element: <AllProducts />,
  },
  {
    name: "Edit Product",
    path: "/all-Products/edit/:productId",
    element: <EditProduct />,
  },
  {
    name: "Duplicate Product",
    path: "/all-Products/duplicate-product/:productId",
    element: <DuplicateProduct />,
  },
];
