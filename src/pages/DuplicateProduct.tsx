import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useAddProductMutation,
  useGetSingleProductByIdQuery,
} from "../redux/features/products/productApi";

const DuplicateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });
  const { data, isLoading, isError } = useGetSingleProductByIdQuery(productId);
  const productData = data?.data;

  const [createProduct] = useAddProductMutation();

  useEffect(() => {
    if (!isLoading && !isError && productData._id) {
      setProductDetails({
        name: productData.name || "",
        price: productData.price || 0,
        quantity: productData.quantity || 0,
      });
    }
  }, [isLoading, isError, productData]);

  const handleDuplicateProduct = async (e: any) => {
    e.preventDefault();
    try {
      const toastId = toast.loading("Duplicating Product...");
      await createProduct(productDetails);
      toast.success("Product duplicated successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate(`/all-products`);
    } catch (error) {
      toast.error("Failed to duplicate product. Please try again later.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !productData) {
    return <div>Error fetching product data. Please try again later.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-orange-600 p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-5">Duplicate Product</h1>
      <form className="text-black m-auto" onSubmit={handleDuplicateProduct}>
        <div className="mb-4">
          <label htmlFor="ProductName" className="block font-semibold mb-2">
            Product Name:
          </label>
          <input
            type="text"
            id="name"
            value={productDetails.name}
            onChange={(e) =>
              setProductDetails({ ...productDetails, name: e.target.value })
            }
            className="px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block font-semibold">
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={productDetails.price}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                price: parseFloat(e.target.value),
              })
            }
            className="px-4 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block font-semibold mb-2">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            value={productDetails.quantity}
            onChange={(e) =>
              setProductDetails({
                ...productDetails,
                quantity: parseFloat(e.target.value),
              })
            }
            className="px-4 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 font-semibold py-2 px-4 rounded"
        >
          Duplicate Product
        </button>
      </form>
    </div>
  );
};

export default DuplicateProduct;
