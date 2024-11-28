import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Footer from "./footer";
import MyNavbar from "./navbar";
import Stores from "../images/stores.jpg";

export default function Shop() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term for filtering shops
  const [notificationMessage, setNotificationMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/usermanagement`
      )
      .then((res) => {
        if (res.data !== "Error" && res.data !== "Fail") {
          setData(res.data);
        }
      });
  }, []);

  const sellers = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.seller_id))).map(
      (sellerId) => {
        const sellerData = data.find((item) => item.seller_id === sellerId);
        return {
          seller_id: sellerId,
          displayName:
            sellerData?.shopname ||
            `${sellerData?.firstname} ${sellerData?.lastname}` ||
            "Unnamed Seller",
        };
      }
    );
  }, [data]);

  const filteredShops = useMemo(() => {
    return sellers.filter((item) =>
      item.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sellers, searchTerm]);

  const handleShopSelect = (e) => {
    const selectedShopId = e.target.value;
    axios
      .post(
        `${process.env.REACT_APP_HOST}${process.env.REACT_APP_PORT}/users`,
        { sellerID: selectedShopId }
      )
      .then((res) => {
        if (res.data !== "Fail" && res.data !== "Error") {
          const userDetails = res.data.map((item) => ({
            userId: item.user_id,
            email: item.email,
            phone: item.phone,
            name: item.firstname + " " + item.lastname,
            shopname: item.shopname,
          }));
          navigate(`/sellerprofile/${selectedShopId}`, {
            state: { userDetails },
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching seller details:", error);
      });
  };

  return (
    <div>
      <MyNavbar />
      <div className="container">
        <div className="fullscreen2">
          <main className="mt-4">
            <div className="m-4 ps-md-4"></div>
            <div className="d-lg-flex">
              <div className="col-lg-6">
                <img src={Stores} alt="Stores" width="100%"></img>
              </div>
              <div className="mt-5">
                <div className="d-flex flex-column justify-content-center align-items-center me-3">
                  <h1 style={{ fontSize: "28px" }}>STORES</h1>

                  <p className="p-2 text-justify">
                    Discover the latest trends at stores, your go-to destination
                    for stylish clothing and accessories. Our curated collection
                    features everything from casual wear to elegant evening
                    outfits, ensuring you’ll find the perfect piece for any
                    occasion.
                  </p>
                </div>
                <div className="menumain">
                  <div>
                    <label htmlFor="shopSelect" className="form-label">
                      {/* Select a Shop: */}
                    </label>
                    <select
                      id="shopSelect"
                      className="form-select mb-3"
                      onChange={handleShopSelect}
                    >
                      <option value="">Choose a shop...</option>
                      {filteredShops.length > 0 ? (
                        filteredShops.map((seller) => (
                          <option
                            key={seller.seller_id}
                            value={seller.seller_id}
                          >
                            {seller.displayName}
                          </option>
                        ))
                      ) : (
                        <option disabled>No shops found</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end"></div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
