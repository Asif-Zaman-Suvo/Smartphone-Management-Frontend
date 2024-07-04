import { FormEvent, useState } from "react";
import { useSaleAProductMutation } from "../../redux/features/sale-product/saleProductApi";
import { toast } from "sonner";

type TSaleDetails = {
  availableStock: number;
  productId: string;
  closeModal: any;
};

const SellForm = ({ availableStock, productId, closeModal }: TSaleDetails) => {
  const [nameOfTheBuyer, setNameOfTheBuyer] = useState("");
  const [sellingQuantity, setSellingQuantity] = useState<number | "">("");
  const [sellingDate, setSellingDate] = useState("");

  const [addNewSale] = useSaleAProductMutation(undefined);

  const handleSaleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Selling");

    const saleDetails = {
      nameOfTheBuyer,
      sellingQuantity: sellingQuantity as number,
      sellingDate,
    };

    try {
      await addNewSale({ productId, saleDetails });
      closeModal();
      toast.success("Sale submitted successfully", {
        id: toastId,
        duration: 2000,
      });
      setNameOfTheBuyer("");
      setSellingQuantity("");
      setSellingDate("");
    } catch (error) {
      toast.error("product not selling", { id: toastId, duration: 2000 });
    }
  };

  return (
    <dialog id="sell_form_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form onSubmit={handleSaleSubmit} className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-2">
            <div className="col-span-2">
              <label
                htmlFor="name of the buyer"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name Of The Buyer
              </label>
              <input
                onChange={(e) => setNameOfTheBuyer(e.target.value)}
                type="text"
                value={nameOfTheBuyer}
                name="buyerName"
                id="buyerName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type buyer name"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="quantity of the product"
                className="block mb-2 text-sm font-medium text-black"
              >
                Quanity
              </label>
              <input
                onChange={(e) => {
                  const newQuantity = parseFloat(e.target.value);
                  if (
                    !isNaN(newQuantity) &&
                    newQuantity >= 0 &&
                    newQuantity <= availableStock
                  ) {
                    setSellingQuantity(newQuantity);
                  } else {
                    toast.warning("Invalid quantity entered");
                  }
                }}
                type="number"
                value={sellingQuantity}
                name="quantity"
                id="quantity"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Amount of product"
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-black"
              >
                Date of the sale
              </label>
              <input
                onChange={(e) => setSellingDate(e.target.value)}
                type="date"
                name="date"
                value={sellingDate}
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="selling date"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="text-sm bg-red-900 py-2 px-3 rounded-md flex justify-end pointer text-white"
              type="submit"
            >
              Sell the product
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SellForm;
