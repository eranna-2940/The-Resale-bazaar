import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "../Notification";
import Adminnavbar from "./Adminnavbar";
import Adminpagination from "./Adminpagination";
import Footer from "../footer";
import Adminmenu from "./Adminmenu";

export default function Sales() {
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [salesProducts, setSalesProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("allSales");

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when page size changes
  }, [pageSize]);

  useEffect(() => {
    // Fetch sales data
    axios
      .get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/shipmentjoin`)
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          setSalesProducts(res.data);
        }
      })
      .catch((err) => console.log(err));

    // Fetch users data (buyers and sellers)
    axios
      .get(`${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/registedusers`)
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          setUsers(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Combine sales data with buyer and seller information
  const combinedSalesData = salesProducts.map((sale) => {
    // Find buyer info based on buyer_id
    const buyer = users.find((user) => user.user_id === sale.buyer_id);
    
    // Find seller info based on seller_id (updated logic)
    const seller = users.find((user) => user.user_id === sale.seller_id);

    return {
      ...sale,
      buyer_name: buyer
        ? `${buyer.firstname} ${buyer.lastname}`
        : `${sale.customer_first_name} ${sale.customer_last_name}`,
      buyer_email: buyer ? buyer.email : sale.customer_email,
      buyer_phone: buyer ? buyer.phone : sale.customer_phone,
      seller_name: seller ? `${seller.firstname} ${seller.lastname}` : "Unknown Seller",  // Correct logic to get seller name
    };
  });

  // Filter sales data based on active tab
  const filteredSalesData =
    activeTab === "allSales"
      ? combinedSalesData
      : combinedSalesData.filter((sale) => sale.seller_name === activeTab);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const tableData = filteredSalesData.slice(startIndex, endIndex);

  // Get unique seller names from the combined sales data (with updated seller names)
  const sellers = [
    ...new Set(
      combinedSalesData
        .map((sale) => sale.seller_name)
        .filter((sellerName) => sellerName !== "Unknown Seller")
    ),
  ];

  return (
    <div>
      <Adminnavbar />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
 <div className="d-md-flex">
        <div className="col-md-2 selleraccordion">
          <Adminmenu />
        </div>
        <div className="col-md-10">
<div className="container">
  <div className="fullscreen2">
    <main>
      <div className="text-center p-3">
        <h6>
          <i>
            <span style={{ color: "blue", fontSize: "25px" }}>Admin</span>
          </i>{" "}
          Dashboard
        </h6>
      </div>

      <div className="m-2 ps-md-4 d-md-flex justify-content-between me-5">
        <h1 style={{ fontSize: "28px" }}>Sales</h1>
        <h1 style={{ fontSize: "28px" }}>
          Total Sales: {filteredSalesData.length}
        </h1>
      </div>

      {/* Tabs with Button Style and Gaps */}
      <div className="btn-group" role="group" aria-label="Seller Tabs">
        {/* All Sales Tab */}
        <button
          className={`btn btn-outline-primary ${activeTab === "allSales" ? "active" : ""}`}
          onClick={() => setActiveTab("allSales")}
        >
          All Sales
        </button>

        {/* Seller Tabs with gaps */}
        {sellers.map((sellerName) => (
          <button
            key={sellerName}
            className={`btn btn-outline-primary ms-2 ${activeTab === sellerName ? "active" : ""}`}
            onClick={() => setActiveTab(sellerName)}
          >
            {sellerName}
          </button>
        ))}
      </div>

      <div className="m-md-3 rounded">
        <div className="table-responsive p-md-3">
          <table
            id="dynamic-table"
            className="table table-striped table-bordered table-hover dataTable no-footer"
            role="grid"
            aria-describedby="dynamic-table_info"
          >
            <thead>
              <tr role="row">
                <th className="p-3">Product Id</th>
                <th className="sorting p-3" tabIndex="0">
                  Product Image
                </th>
                <th className="sorting p-3" tabIndex="0">
                  Product Name
                </th>
                <th className="hidden-480 sorting p-3" tabIndex="0">
                  Buyer Name
                </th>
                <th className="hidden-480 sorting p-3" tabIndex="0">
                  Seller Name
                </th>
                <th className="hidden-480 sorting p-3" tabIndex="0">
                  Order Price
                </th>
                <th className="hidden-480 sorting p-3" tabIndex="0">
                  Order Date
                </th>
                <th className="hidden-480 sorting p-3" tabIndex="0">
                  Shipment Date
                </th>
                <th className="hidden-480 sorting p-3" tabIndex="0">
                  Delivered Date
                </th>
                <th className="hidden-480 sorting p-3">
                  Contact Details
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length > 0 ? (
                tableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_id}</td>
                    <td>
                      <div
                        className="text-center"
                        style={{ width: "100px", height: "100px" }}
                      >
                        <img
                          src={`${JSON.parse(item.image)?.[0]}`}
                          alt="product"
                          style={{
                            maxWidth: "100%",
                            height: "100px",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.buyer_name}</td>
                    <td>{item.seller_name}</td> {/* Seller name */}
                    <td>&#36;{item.order_amount}</td>
                    <td>
                      {item.ordered_date && item.ordered_date.slice(0, 10)}
                    </td>
                    <td>
                      {item.shipped_date && item.shipped_date.slice(0, 10)}
                    </td>
                    <td>
                      {item.delivered_date &&
                        item.delivered_date.slice(0, 10)}
                    </td>
                    <td>
                      {item.buyer_email} <br />
                      {item.buyer_phone}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center">
                    No Data To Display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Adminpagination
          stateData={filteredSalesData}
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  </div>
</div>
</div>
</div>
      <Footer />
    </div>
  );
}
