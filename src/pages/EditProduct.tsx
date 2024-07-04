import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../redux/features/products/productApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetAllProductsQuery(undefined);
  const allProducts = data.data;

  const [productDetails, setProductDetails] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    const newProduct = allProducts?.find((item: any) => item._id === productId);
    if (newProduct) {
      setProductDetails({
        name: newProduct.name,
        price: newProduct.price,
        quantity: newProduct.quantity,
      });
    }
  }, [allProducts, productId]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const toastId = toast.loading("Updating");
    try {
      await updateProduct({ productId, ...productDetails }),
        toast.success("Product updated successfully", {
          id: toastId,
          duration: 2000,
        });
      navigate(`/all-Products`);
    } catch (error) {
      toast.error("product not updating", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="p-4 w-full  m-auto left-7 top-28">
      <div className="bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Update The Product
          </h3>
        </div>
        <form onSubmit={handleUpdate} className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                onChange={(e) =>
                  setProductDetails((prevDetails) => ({
                    ...prevDetails,
                    name: e.target.value,
                  }))
                }
                type="text"
                name="name"
                id="name"
                value={productDetails.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                onChange={(e) =>
                  setProductDetails((prevDetails) => ({
                    ...prevDetails,
                    price: parseFloat(e.target.value),
                  }))
                }
                type="number"
                name="price"
                id="price"
                value={productDetails.price}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write price"
                required
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Quanity
              </label>
              <input
                onChange={(e) =>
                  setProductDetails((prevDetails) => ({
                    ...prevDetails,
                    quantity: parseFloat(e.target.value),
                  }))
                }
                type="number"
                name="quantity"
                id="quantity"
                value={productDetails.quantity}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Amount of product"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="text-sm bg-red-800 py-2 px-3 rounded-md flex justify-end pointer text-white"
              type="submit"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
