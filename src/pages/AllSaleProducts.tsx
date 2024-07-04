import { useState } from "react";
import SaleFilterDropdown from "../components/DropDown/SaleFilterDropdown";
import Loader from "../components/layout/Loader";
import { useGetAllSaleProductsQuery } from "../redux/features/sale-product/saleProductApi";
import {
  Document,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const AllSaleProducts = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState(undefined);

  const { data, isLoading } = useGetAllSaleProductsQuery(selectedTimeFrame);
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    title: {
      fontSize: 16,
      marginBottom: 10,
      fontWeight: "bold",
      textAlign: "center",
    },
    table: {
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderCollapse: "collapse",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      borderStyle: "solid",
      borderWidth: 1,
      padding: 5,
      width: "20%",
    },
  });

  const InvoiceDocument = ({ info }: any) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Product Sales Invoice</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>Product name</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Product Price</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Selling Quantity</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Selling Date</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>Name of the buyer</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{info?.product.name}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{info?.product.price}$</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{info?.sellingQuantity} piece</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{info?.sellingDate}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{info?.nameOfTheBuyer}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
  return (
    <>
      <div className="flex justify-around">
        <div className="font-bold">Product Sales History</div>
        <SaleFilterDropdown setSelectedTimeFrame={setSelectedTimeFrame} />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <table className="mt-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Product Price
              </th>
              <th scope="col" className="px-6 py-3">
                Selling Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Selling Date
              </th>
              <th scope="col" className="px-6 py-3">
                Name of the buyer
              </th>
              <th scope="col" className="px-6 py-3">
                Download Invoice
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((info: any) => (
              <tr
                key={info._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {info?.product?.name}
                </th>
                <td className="px-6 py-4">{`${info?.product?.price}$`}</td>
                <td className="px-6 py-4">{`${info?.sellingQuantity} piece`}</td>
                <td className="px-6 py-4">{info?.sellingDate}</td>
                <td className="px-6 py-4">{info?.nameOfTheBuyer}</td>
                <td className="px-6 py-4">
                  <button className="mt-2 mr-2 bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                    <PDFDownloadLink
                      document={<InvoiceDocument info={info} />} // Pass specific sale details
                      fileName={`invoice_${info.nameOfTheBuyer}.pdf`} // Use sale ID in file name
                    >
                      {() =>
                        isLoading ? "Loading document..." : "Download PDF"
                      }
                    </PDFDownloadLink>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AllSaleProducts;
