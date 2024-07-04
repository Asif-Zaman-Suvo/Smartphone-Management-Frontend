/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import AddProductModal from "../components/Modal/AddProductModal";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../redux/features/products/productApi";
import SearchBar from "../components/SearchBar/SearchBar";
import { useState } from "react";
import SellForm from "../components/SellForm/SellForm";
import Loader from "../components/layout/Loader";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

const AllProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const userRole = useAppSelector(selectCurrentUser);
  const openModal = (product: any) => {
    setSelectedProduct(product);
    const sellModal = document.getElementById("sell_form_modal");
    if (sellModal) {
      (sellModal as HTMLDialogElement).showModal();
    }
  };

  const closeModal = () => {
    const sellModal = document.getElementById("sell_form_modal");
    if (sellModal) {
      (sellModal as HTMLDialogElement).close();
    }
  };

  return (
    <>
      <div className="flex justify-between">
        <AddProductModal />
        <SearchBar setSearch={setSearch} />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                SmartPhone name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Duplicate and Edit Product
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data
              ?.filter((item: any) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((info: any) => (
                <tr
                  key={info._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 items-center"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {info?.name}
                  </th>
                  <td className="px-6 py-4">{`${info?.price}$`}</td>
                  <td className="px-6 py-4">{info?.quantity}</td>
                  <td className="px-6 py-4">
                    {userRole?.role !== "seller" && (
                      <>
                        <Link to={`/all-products/edit/${info._id}`}>
                          <button className="mt-2 mr-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteProduct(info._id)}
                          className="mt-2 mr-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {userRole?.role !== "manager" && (
                      <button
                        onClick={() => openModal(info)}
                        className="mt-2 bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded"
                      >
                        Sell
                      </button>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <Link to={`/all-products/duplicate-product/${info._id}`}>
                      <button className="mt-2 mr-2 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                        Duplicate & Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <SellForm
        availableStock={selectedProduct?.quantity}
        productId={selectedProduct?._id}
        closeModal={closeModal}
      />
    </>
  );
};

export default AllProducts;
